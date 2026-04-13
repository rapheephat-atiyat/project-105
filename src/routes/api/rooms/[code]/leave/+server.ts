import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { gameRooms, roomParticipants } from '$lib/server/db/schema';
import { eq, and } from 'drizzle-orm';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, params }) => {
    const body = await request.json();

    const room = await db.query.gameRooms.findFirst({
        where: eq(gameRooms.joinCode, params.code.toUpperCase())
    });

    if (!room) return json({ error: 'Room not found' }, { status: 404 });

    await db.delete(roomParticipants).where(
        and(
            eq(roomParticipants.roomId, room.id),
            eq(roomParticipants.playerId, body.playerId)
        )
    );

    return json({ success: true });
};