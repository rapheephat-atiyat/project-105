import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { gameRooms, players } from '$lib/server/db/schema';
import { auth } from '$lib/server/auth';
import { eq, desc, and } from 'drizzle-orm';
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
            .where(and(
                eq(gameRooms.status, 'waiting'),
                eq(gameRooms.isPrivate, false)
            ))
            .orderBy(desc(gameRooms.createdAt));

        return json({ success: true, rooms: roomsResult });
    } catch (err) {
        console.error(err);
        return json({ success: false, error: 'Failed to fetch rooms' }, { status: 500 });
    }
};

export const POST: RequestHandler = async ({ request, cookies }) => {
    try {
        const body = await request.json();

        let hostPlayerId = body.playerId;
        const session = await auth.api.getSession({ headers: request.headers });

        if (!hostPlayerId) {
            const guestCookie = cookies.get('sorter_guest_id');
            if (guestCookie) {
                const existingGuest = await db.query.players.findFirst({
                    where: eq(players.id, guestCookie)
                });
                if (existingGuest) hostPlayerId = existingGuest.id;
            }

            if (!hostPlayerId && session?.user?.id) {
                const existingPlayer = await db.query.players.findFirst({
                    where: eq(players.userId, session.user.id)
                });
                hostPlayerId = existingPlayer?.id;
            }

            if (!hostPlayerId) {
                const [newPlayer] = await db.insert(players).values({
                    type: session?.user ? 'user' : 'guest',
                    guestName: session?.user?.name || `GUEST_${Math.floor(1000 + Math.random() * 9000)}`,
                    userId: session?.user?.id || null
                }).returning();
                hostPlayerId = newPlayer.id;

                cookies.set('sorter_guest_id', newPlayer.id, {
                    path: '/',
                    maxAge: 60 * 60 * 24 * 7,
                    httpOnly: true,
                    secure: false 
                });
            }
        }

        const joinCode = `RM-${Math.floor(100 + Math.random() * 900)}`;

        const size = body.mode === 'Hard' ? 12 : 6;
        const initialArray = Array.from({ length: size }, () => Math.floor(Math.random() * 100));

        const [newRoom] = await db.insert(gameRooms).values({
            joinCode,
            status: 'waiting',
            mode: body.mode || 'Normal',
            algorithm: body.algorithm || 'Quick Sort',
            maxPlayers: body.maxPlayers || 4,
            isPrivate: body.isPrivate || false,
            initialArray,
            hostPlayerId
        }).returning();

        return json({ success: true, room: newRoom });
    } catch (err) {
        console.error(err);
        return json({ success: false, error: 'Failed to create room' }, { status: 500 });
    }
};
