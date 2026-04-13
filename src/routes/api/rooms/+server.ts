import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { gameRooms } from '$lib/server/db/schema';
import { auth } from '$lib/server/auth';
import type { RequestHandler } from './$types';

function generateJoinCode() {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
}

export const POST: RequestHandler = async ({ request }) => {
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session) return json({ error: 'Unauthorized' }, { status: 401 });

    const body = await request.json();
    const joinCode = generateJoinCode();
    const initialArray = [9, 4, 7, 2, 1, 5, 8, 3, 6];

    const [newRoom] = await db.insert(gameRooms).values({
        hostPlayerId: body.hostPlayerId,
        mode: body.mode,
        algorithm: body.algorithm,
        joinCode: joinCode,
        initialArray: initialArray
    }).returning();

    return json({ roomId: newRoom.id, joinCode: newRoom.joinCode });
};