import { db } from '$lib/server/db';
import type { Server, Socket } from 'socket.io';
import { gameRooms, matchSteps, roomParticipants } from './db/schema';
import { and, eq } from 'drizzle-orm';

export function setupSockets(io: Server) {
    io.on("connection", (socket: Socket) => {
        socket.on('join-game', (roomCode: string) => {
            socket.join(roomCode)
        });

        socket.on("player-ready", async ({ roomId, playerId }: { roomId: string, playerId: string }) => {
            await db.update(roomParticipants).set({ isReady: true }).where(and(eq(roomParticipants.roomId, roomId), eq(roomParticipants.playerId, playerId)));

            const participants = await db.query.roomParticipants.findMany({
                where: eq(roomParticipants.roomId, roomId)
            });

            if (participants.every(p => p.isReady)) {
                await db.update(gameRooms).set({ status: 'playing' }).where(eq(gameRooms.id, roomId));
                io.to(roomId).emit('game-start');
            }

            io.to(roomId).emit('update-participants', participants);
        });

        socket.on('submit-step', async ({ roomId, playerId, stepData }: {
            roomId: string, playerId: string, stepData: {
                stepNumber: number;
                currentArray: any;
                isCorrect: boolean;
            }
        }) => {
            const { stepNumber, currentArray, isCorrect } = stepData;
            await db.insert(matchSteps).values({
                roomId,
                playerId,
                stepNumber,
                currentArray,
                isCorrect
            });

            if (isCorrect && checkGameFinished(currentArray)) {
                await db.update(roomParticipants)
                    .set({ finishedAt: new Date() })
                    .where(and(
                        eq(roomParticipants.roomId, roomId),
                        eq(roomParticipants.playerId, playerId)
                    ));

                io.to(roomId).emit('player-finished', { playerId });
            }
        });
    });
}

function checkGameFinished(array: any) {
    for (let i = 0; i < array.length - 1; i++) {
        if (array[i] > array[i + 1]) return false;
    }
    return true;
}