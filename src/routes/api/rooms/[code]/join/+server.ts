import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { gameRooms, roomParticipants } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, params }) => {
    const body = await request.json();

    const room = await db.query.gameRooms.findFirst({
        where: eq(gameRooms.joinCode, params.code.toUpperCase())
    });

    if (!room) return json({ error: 'Room not found' }, { status: 404 });
    if (room.status !== 'waiting') return json({ error: 'Invalid status' }, { status: 400 });

    await db.insert(roomParticipants).values({
        roomId: room.id,
        playerId: body.playerId
    });

    return json({ success: true, roomId: room.id });
};