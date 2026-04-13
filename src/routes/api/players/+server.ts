import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { players } from '$lib/server/db/schema';
import { auth } from '$lib/server/auth';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
    try {
        const body = await request.json();
        const session = await auth.api.getSession({ headers: request.headers });

        const [newPlayer] = await db.insert(players).values({
            type: body.type, // 'user' หรือ 'guest'
            guestName: body.guestName,
            avatar: body.avatar,
            userId: session?.user?.id || null
        }).returning();

        return json({ success: true, playerId: newPlayer.id });
    } catch (err) {
        console.error(err);
        return json({ success: false, error: 'Failed to create player' }, { status: 500 });
    }
};