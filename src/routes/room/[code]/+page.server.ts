import { db } from '$lib/server/db';
import { gameRooms, roomParticipants, users } from '$lib/server/db/schema';
import { redirect, error } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, locals }) => {
    if (!locals.user) throw redirect(302, '/login');

    const room = await db.query.gameRooms.findFirst({
        where: eq(gameRooms.joinCode, params.code)
    });

    if (!room) throw error(404, 'Room not found');

    const participants = await db
        .select({
            user: users,
            participant: roomParticipants
        })
        .from(roomParticipants)
        .innerJoin(users, eq(roomParticipants.playerId, users.id))
        .where(eq(roomParticipants.roomId, room.id));

    return {
        room,
        participants,
        currentUser: locals.user
    };
};