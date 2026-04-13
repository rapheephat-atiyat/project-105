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
        socket.on('join-game', async (roomCode: string) => {
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

            if (participants.length > 0 && participants.every(p => p.isReady)) {
                await db.update(gameRooms).set({ status: 'playing' }).where(eq(gameRooms.id, roomId));
                io.to(room.joinCode).emit('game-start');
            }

            io.to(room.joinCode).emit('update-participants', participants);
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
    });
}

async function broadcastParticipants(io: Server, roomCode: string) {
    const room = await db.query.gameRooms.findFirst({
        where: eq(gameRooms.joinCode, roomCode)
    });

    if (room) {
        const participants = await db.query.roomParticipants.findMany({
            where: eq(roomParticipants.roomId, room.id)
        });
        io.to(roomCode).emit('update-participants', participants);
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