import { db } from '$lib/server/db';
import { gameRooms, roomParticipants, matchSteps, users, players } from '$lib/server/db/schema';
import { auth } from '$lib/server/auth';
import { roomQueue, roomWorker } from '$lib/server/queue/roomQueue';
import { eq, and, desc, sql } from 'drizzle-orm';
import type { Server, Socket } from 'socket.io';

export function verifyStep(previousArray: any[], currentArray: any[]): boolean {
    if (previousArray.length !== currentArray.length) return false;
    let diffCount = 0;
    for (let i = 0; i < previousArray.length; i++) {
        if (previousArray[i] !== currentArray[i]) diffCount++;
    }
    return diffCount === 2;
}

export function isSorted(array: any[]): boolean {
    for (let i = 0; i < array.length - 1; i++) {
        if (array[i] > array[i + 1]) return false;
    }
    return true;
}

export function calculateScore(startTime: Date, endTime: Date, steps: number, mode: string): number {
    const timeTaken = (endTime.getTime() - startTime.getTime()) / 1000;
    const baseScore = mode === 'Hard' ? 2000 : mode === 'Normal' ? 1000 : 500;
    return Math.floor(Math.max(0, baseScore - (timeTaken * 10) - (steps * 2)));
}

export function setupSockets(io: Server) {
    io.use(async (socket, next) => {
        const sessionToken = socket.handshake.auth.token;
        if (!sessionToken) return next(new Error('Authentication error'));

        const session = await auth.api.getSession({
            headers: new Headers({ cookie: `better-auth.session_token=${sessionToken}` })
        });

        if (!session) return next(new Error('Authentication error'));

        socket.data.userId = session.user.id;
        socket.data.user = session.user;
        next();
    });

    roomWorker.on('completed', (job, result) => {
        io.to(result.socketId).emit('queue-finished', {
            joinCode: result.joinCode,
            roomId: result.roomId
        });
    });

    io.on('connection', (socket: Socket) => {
        socket.on('join-create-queue', async ({ mode, playerId }) => {
            try {
                await roomQueue.add('create-room', { playerId, mode, socketId: socket.id });
                const waitingCount = await roomQueue.getWaitingCount();
                socket.emit('queue-status', { position: waitingCount + 1, status: 'waiting' });
            } catch (err) {
                socket.emit('queue-error', { message: 'Failed to join queue' });
            }
        });

        socket.on('join-room-direct', async ({ joinCode, playerId }) => {
            try {
                const room = await db.query.gameRooms.findFirst({
                    where: eq(gameRooms.joinCode, joinCode.toUpperCase())
                });

                if (!room || room.status !== 'waiting') {
                    return socket.emit('join-error', { message: 'Room not found or game started' });
                }

                await db.insert(roomParticipants).values({
                    roomId: room.id,
                    playerId: playerId
                }).onConflictDoNothing();

                socket.emit('join-success', { joinCode: room.joinCode, roomId: room.id });
                io.to(`room:${room.joinCode}`).emit('update-participants');
            } catch (err) {
                socket.emit('join-error', { message: 'Error joining room' });
            }
        });

        socket.on('join-game', async (joinCode: string) => {
            socket.join(`room:${joinCode}`);
            io.to(`room:${joinCode}`).emit('update-participants');
        });

        socket.on('player-ready', async ({ roomId, playerId }) => {
            try {
                await db.update(roomParticipants)
                    .set({ isReady: true })
                    .where(and(eq(roomParticipants.roomId, roomId), eq(roomParticipants.playerId, playerId)));

                const allParticipants = await db.query.roomParticipants.findMany({
                    where: eq(roomParticipants.roomId, roomId)
                });

                const room = await db.query.gameRooms.findFirst({
                    where: eq(gameRooms.id, roomId)
                });

                io.to(`room:${room?.joinCode}`).emit('update-participants', allParticipants);

                if (allParticipants.length > 0 && allParticipants.every(p => p.isReady)) {
                    await db.update(gameRooms)
                        .set({ status: 'playing', updatedAt: new Date() })
                        .where(eq(gameRooms.id, roomId));

                    io.to(`room:${room?.joinCode}`).emit('game-start', {
                        initialArray: room?.initialArray,
                        startTime: new Date()
                    });
                }
            } catch (err) {
                console.error(err);
            }
        });

        socket.on('submit-step', async ({ roomId, playerId, stepData }) => {
            const { stepNumber, currentArray } = stepData;

            try {
                const room = await db.query.gameRooms.findFirst({
                    where: eq(gameRooms.id, roomId)
                });

                if (!room || room.status !== 'playing') return;

                const lastStep = await db.query.matchSteps.findFirst({
                    where: and(eq(matchSteps.roomId, roomId), eq(matchSteps.playerId, playerId)),
                    orderBy: [desc(matchSteps.stepNumber)]
                });

                const previousArray = lastStep ? (lastStep.currentArray as any[]) : (room.initialArray as any[]);
                const isValidMove = verifyStep(previousArray, currentArray);

                await db.insert(matchSteps).values({
                    roomId,
                    playerId,
                    stepNumber,
                    currentArray,
                    isCorrect: isValidMove
                });

                if (isValidMove && isSorted(currentArray)) {
                    const finishedAt = new Date();

                    const existingWinners = await db.query.roomParticipants.findMany({
                        where: and(eq(roomParticipants.roomId, roomId), sql`${roomParticipants.finishedAt} IS NOT NULL`)
                    });

                    const rank = existingWinners.length + 1;
                    const score = calculateScore(room.updatedAt, finishedAt, stepNumber, room.mode);

                    await db.update(roomParticipants)
                        .set({ finishedAt, rank, score })
                        .where(and(eq(roomParticipants.roomId, roomId), eq(roomParticipants.playerId, playerId)));

                    io.to(`room:${room.joinCode}`).emit('player-finished', { playerId, rank, score });

                    const participants = await db.query.roomParticipants.findMany({
                        where: eq(roomParticipants.roomId, roomId)
                    });

                    if (participants.every(p => p.finishedAt !== null)) {
                        await db.update(gameRooms).set({ status: 'ended' }).where(eq(gameRooms.id, roomId));

                        for (const p of participants) {
                            const playerInfo = await db.query.players.findFirst({
                                where: eq(players.id, p.playerId)
                            });

                            if (playerInfo?.userId && p.score) {
                                await db.update(users)
                                    .set({ rankScore: sql`${users.rankScore} + ${p.score}` })
                                    .where(eq(users.id, playerInfo.userId));
                            }
                        }

                        io.to(`room:${room.joinCode}`).emit('game-over');
                    }
                }
            } catch (err) {
                console.error(err);
            }
        });

        socket.on('disconnect', () => { });
    });
}