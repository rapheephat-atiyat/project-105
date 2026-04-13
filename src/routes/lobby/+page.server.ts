import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { db } from '$lib/server/db';
import { gameRooms, roomParticipants } from '$lib/server/db/schema';
import { and, eq } from 'drizzle-orm';

const generateRoomCode = () => Math.random().toString(36).substring(2, 8).toUpperCase();

const getArraySize = (mode: string) => {
    switch (mode) {
        case "Easy": return 8;
        case "Hard": return 20;
        case "Skibidi Toilet": return 30;
        default: return 10;
    }
};

export const actions: Actions = {
    createRoom: async ({ locals, request }) => {
        if (!locals.user) return fail(401);

        const formData = await request.formData();
        const mode = formData.get('mode') as any;
        const algorithm = formData.get('algorithm') as string;
        const joinCode = generateRoomCode();
        const initialArray = Array.from({ length: getArraySize(mode) }, () => Math.floor(Math.random() * 100));

        const [room] = await db.insert(gameRooms).values({
            joinCode,
            mode,
            algorithm,
            initialArray,
            hostPlayerId: locals.user.id,
            status: "waiting"
        }).returning();

        await db.insert(roomParticipants).values({
            roomId: room.id,
            playerId: locals.user.id
        });

        throw redirect(303, `/room/${joinCode}`);
    },

    joinRoom: async ({ locals, request }) => {
        if (!locals.user) return fail(401);

        const formData = await request.formData();
        const joinCode = formData.get('joinCode')?.toString().toUpperCase();

        if (!joinCode) return fail(400);

        const room = await db.query.gameRooms.findFirst({
            where: eq(gameRooms.joinCode, joinCode)
        });

        if (!room || room.status !== 'waiting') return fail(404);

        const existing = await db.query.roomParticipants.findFirst({
            where: and(eq(roomParticipants.roomId, room.id), eq(roomParticipants.playerId, locals.user.id))
        });

        if (!existing) {
            const currentParticipants = await db.query.roomParticipants.findMany({
                where: eq(roomParticipants.roomId, room.id)
            });

            if (currentParticipants.length >= 10) {
                return fail(400, { message: 'Room is full (max 10 players)' });
            }

            await db.insert(roomParticipants).values({
                roomId: room.id,
                playerId: locals.user.id
            });
        }

        throw redirect(303, `/room/${joinCode}`);
    }
}