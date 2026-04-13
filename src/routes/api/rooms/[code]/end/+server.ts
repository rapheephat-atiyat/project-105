import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { gameRooms, roomParticipants, players, users } from '$lib/server/db/schema';
import { eq, sql } from 'drizzle-orm';
import { auth } from '$lib/server/auth';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, params }) => {
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session) return json({ error: 'Unauthorized' }, { status: 401 });

    const room = await db.query.gameRooms.findFirst({
        where: eq(gameRooms.joinCode, params.code.toUpperCase())
    });

    if (!room) return json({ error: 'Room not found' }, { status: 404 });

    await db.update(gameRooms)
        .set({ status: 'ended', updatedAt: new Date() })
        .where(eq(gameRooms.id, room.id));

    const participants = await db.select()
        .from(roomParticipants)
        .innerJoin(players, eq(roomParticipants.playerId, players.id))
        .where(eq(roomParticipants.roomId, room.id));

    for (const p of participants) {
        if (p.players.userId && p.room_participants.score) {
            await db.update(users)
                .set({ rankScore: sql`${users.rankScore} + ${p.room_participants.score}` })
                .where(eq(users.id, p.players.userId));
        }
    }

    return json({ success: true });
};