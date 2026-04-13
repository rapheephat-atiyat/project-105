import { Queue, Worker } from 'bullmq';
import { redisConnection } from './redis';
import { db } from '$lib/server/db';
import { gameRooms, roomParticipants } from '$lib/server/db/schema';

export const roomQueue = new Queue('room-matchmaking', {
    connection: redisConnection
});

const getArraySize = (mode: string) => {
    switch (mode) {
        case "Easy": return 8;
        case "Hard": return 20;
        case "Skibidi Toilet": return 30;
        default: return 10; // Normal
    }
};

export const roomWorker = new Worker(
    'room-matchmaking',
    async (job) => {
        const { playerId, mode, socketId } = job.data;

        await new Promise(resolve => setTimeout(resolve, 800));

        const joinCode = Math.random().toString(36).substring(2, 8).toUpperCase();
        const initialArray = Array.from({ length: getArraySize(mode) }, () => Math.floor(Math.random() * 100));

        const [newRoom] = await db.insert(gameRooms).values({
            hostPlayerId: playerId,
            mode: mode,
            algorithm: 'Bubble Sort',
            joinCode,
            initialArray
        }).returning();

        await db.insert(roomParticipants).values({
            roomId: newRoom.id,
            playerId
        });

        return { joinCode, socketId, roomId: newRoom.id };
    },
    {
        connection: redisConnection,
        limiter: {
            max: 10,
            duration: 1000
        }
    }
);

roomWorker.on('failed', (job, err) => {
    console.error(`Job ${job?.id} failed with error:`, err.message);
});