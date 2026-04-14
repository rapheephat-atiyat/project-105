import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { gameRooms, players } from '$lib/server/db/schema';
import { auth } from '$lib/server/auth';
import { eq, desc } from 'drizzle-orm';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
    try {
        const roomsResult = await db.select({
            id: gameRooms.id,
            joinCode: gameRooms.joinCode,
            status: gameRooms.status,
            mode: gameRooms.mode,
            algorithm: gameRooms.algorithm,
            createdAt: gameRooms.createdAt,
            hostPlayer: {
                id: players.id,
                guestName: players.guestName,
                userId: players.userId,
                avatar: players.avatar
            }
        })
        .from(gameRooms)
        .leftJoin(players, eq(gameRooms.hostPlayerId, players.id))
        .where(eq(gameRooms.status, 'waiting'))
        .orderBy(desc(gameRooms.createdAt));

        return json({ success: true, rooms: roomsResult });
    } catch (err) {
        console.error(err);
        return json({ success: false, error: 'Failed to fetch rooms' }, { status: 500 });
    }
};

export const POST: RequestHandler = async ({ request }) => {
    try {
        const body = await request.json();
        
        // Ensure we have a valid player ID. If none provided, create a guest player.
        let hostPlayerId = body.playerId;
        const session = await auth.api.getSession({ headers: request.headers });

        if (!hostPlayerId) {
            // Check if there is a player associated with the logged in user
            if (session?.user?.id) {
                const existingPlayer = await db.query.players.findFirst({
                    where: eq(players.userId, session.user.id)
                });
                hostPlayerId = existingPlayer?.id;
            }

            // Create anonymous player if none found
            if (!hostPlayerId) {
                const [newPlayer] = await db.insert(players).values({
                    type: session?.user ? 'user' : 'guest',
                    guestName: 'Anonymous_User',
                    userId: session?.user?.id || null
                }).returning();
                hostPlayerId = newPlayer.id;
            }
        }

        const joinCode = `RM-${Math.floor(100 + Math.random() * 900)}`;

        // Generate mock array for sorting
        const size = body.mode === 'Hard' ? 12 : 6;
        const initialArray = Array.from({ length: size }, () => Math.floor(Math.random() * 100));

        const [newRoom] = await db.insert(gameRooms).values({
            joinCode,
            status: 'waiting',
            mode: body.mode || 'Normal',
            algorithm: body.algorithm || 'Quick Sort',
            initialArray,
            hostPlayerId
        }).returning();

        return json({ success: true, room: newRoom });
    } catch (err) {
        console.error(err);
        return json({ success: false, error: 'Failed to create room' }, { status: 500 });
    }
};
