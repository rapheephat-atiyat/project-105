import { db } from '$lib/server/db';
import type { Server, Socket } from 'socket.io';
import { gameRooms, matchSteps, roomParticipants, sessions } from './db/schema';
import { and, eq } from 'drizzle-orm';

export function setupSockets(io: Server) {
    io.use(async (socket, next) => {
        const token = socket.handshake.auth.token;
        if (!token) return next(new Error('Authentication error'));

        const session = await db.query.sessions.findFirst({
            where: eq(sessions.token, token)
        });

        if (!session || session.expiresAt < new Date()) {
            return next(new Error('Authentication error'));
        }

        socket.data.userId = session.userId;
        next();
    });

    io.on("connection", (socket: Socket) => {
        socket.on('join-game', async ({ roomCode, playerId }: { roomCode: string, playerId: string }) => {
            // Track physical mapping
            socket.data.roomCode = roomCode;
            socket.data.playerId = playerId;

            socket.join(roomCode);
            await broadcastParticipants(io, roomCode);
        });

        socket.on('sync-participants', async (roomCode: string) => {
            await broadcastParticipants(io, roomCode);
        });

        socket.on("player-ready", async ({ roomId, playerId }: { roomId: string, playerId: string }) => {
            await db.update(roomParticipants)
                .set({ isReady: true })
                .where(and(eq(roomParticipants.roomId, roomId), eq(roomParticipants.playerId, playerId)));

            const room = await db.query.gameRooms.findFirst({ where: eq(gameRooms.id, roomId) });
            if (!room) return;

            const participants = await db.query.roomParticipants.findMany({
                where: eq(roomParticipants.roomId, roomId)
            });

            // Minimum 2 players to start a game organically
            if (participants.length >= 2 && participants.every(p => p.isReady)) {
                await db.update(gameRooms).set({ status: 'playing' }).where(eq(gameRooms.id, roomId));
                io.to(room.joinCode).emit('game-start');
            }

            await broadcastParticipants(io, room.joinCode);
        });

        socket.on('submit-step', async ({ roomId, playerId, stepData }: {
            roomId: string, playerId: string, stepData: {
                stepNumber: number;
                currentArray: any[];
            }
        }) => {
            const { stepNumber, currentArray } = stepData;
            const isCorrect = verifyStep(currentArray);

            await db.insert(matchSteps).values({
                roomId,
                playerId,
                stepNumber,
                currentArray,
                isCorrect
            });

            const room = await db.query.gameRooms.findFirst({ where: eq(gameRooms.id, roomId) });
            if (!room) return;

            if (isCorrect && checkGameFinished(currentArray)) {
                await db.update(roomParticipants)
                    .set({ finishedAt: new Date() })
                    .where(and(
                        eq(roomParticipants.roomId, roomId),
                        eq(roomParticipants.playerId, playerId)
                    ));

                io.to(room.joinCode).emit('player-finished', { playerId });
            }
        });

        socket.on('disconnect', async () => {
            const { roomCode, playerId } = socket.data;
            if (roomCode && playerId) {
                const room = await db.query.gameRooms.findFirst({
                    where: eq(gameRooms.joinCode, roomCode)
                });

                if (room) {
                    await db.delete(roomParticipants).where(and(
                        eq(roomParticipants.roomId, room.id),
                        eq(roomParticipants.playerId, playerId)
                    ));

                    const remaining = await db.query.roomParticipants.findMany({
                        where: eq(roomParticipants.roomId, room.id)
                    });

                    if (remaining.length === 0) {
                        await db.delete(gameRooms).where(eq(gameRooms.id, room.id));
                    } else {
                        await broadcastParticipants(io, roomCode);
                    }
                }
            }
        });
    });
}

async function broadcastParticipants(io: Server, roomCode: string) {
    const room = await db.query.gameRooms.findFirst({
        where: eq(gameRooms.joinCode, roomCode)
    });

    if (room) {
        const participantsData = await db.select({
            playerId: roomParticipants.playerId,
            isReady: roomParticipants.isReady,
            guestName: players.guestName,
            avatar: players.avatar
        })
            .from(roomParticipants)
            .innerJoin(players, eq(roomParticipants.playerId, players.id))
            .where(eq(roomParticipants.roomId, room.id));

        io.to(roomCode).emit('update-participants', participantsData);
    }
}

function verifyStep(array: any[]) {
    return true;
}

function checkGameFinished(array: any[]) {
    for (let i = 0; i < array.length - 1; i++) {
        if (array[i] > array[i + 1]) return false;
    }
    return true;
}