import { error } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { gameRooms, players, roomParticipants } from '$lib/server/db/schema';
import { eq, and } from 'drizzle-orm';
import { auth } from '$lib/server/auth';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, request, cookies }) => {
    const session = await auth.api.getSession({ headers: request.headers });

    const room = await db.query.gameRooms.findFirst({
        where: eq(gameRooms.joinCode, params.id)
    });

    if (!room) {
        throw error(404, 'Arena not found. Use a valid trace ID.');
    }

    let currentPlayer = null;

    if (session?.user?.id) {
        currentPlayer = await db.query.players.findFirst({
            where: eq(players.userId, session.user.id)
        });
    }

    if (!currentPlayer) {
        const guestCookie = cookies.get('sorter_guest_id');
        if (guestCookie) {
            currentPlayer = await db.query.players.findFirst({
                where: eq(players.id, guestCookie)
            });
        }

        if (!currentPlayer) {
            const generatedName = session?.user?.name || `GUEST_${Math.floor(1000 + Math.random() * 9000)}`;
            const [newPlayer] = await db.insert(players).values({
                type: session?.user ? 'user' : 'guest',
                guestName: generatedName,
                userId: session?.user?.id || null
            }).returning();
            currentPlayer = newPlayer;

            cookies.set('sorter_guest_id', newPlayer.id, {
                path: '/',
                maxAge: 60 * 60 * 24 * 7,
                httpOnly: true,
                secure: false // Since local dev
            });
        }
    }

    const currentPlayerId = currentPlayer.id;

    const existingParticipant = await db.query.roomParticipants.findFirst({
        where: and(
            eq(roomParticipants.roomId, room.id),
            eq(roomParticipants.playerId, currentPlayerId)
        )
    });

    if (!existingParticipant) {
        await db.insert(roomParticipants).values({
            roomId: room.id,
            playerId: currentPlayerId,
            isReady: false
        });
    }

    const participantsData = await db.select({
        playerId: roomParticipants.playerId,
        isReady: roomParticipants.isReady,
        guestName: players.guestName,
        avatar: players.avatar
    })
        .from(roomParticipants)
        .innerJoin(players, eq(roomParticipants.playerId, players.id))
        .where(eq(roomParticipants.roomId, room.id));

    return {
        room,
        currentPlayer,
        participantsData
    };
};
