import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { gameRooms } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params }) => {
    const room = await db.query.gameRooms.findFirst({
        where: eq(gameRooms.joinCode, params.code.toUpperCase())
    });

    if (!room) return json({ error: 'Room not found' }, { status: 404 });
    return json(room);
};