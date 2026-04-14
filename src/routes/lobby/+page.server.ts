import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { gameRooms, players } from '$lib/server/db/schema';
import { eq, desc } from 'drizzle-orm';
import { auth } from '$lib/server/auth';

export const load: PageServerLoad = async ({ request }) => {
    // 1. Fetch Active Rooms directly from DB for SSR speed
    const roomsResult = await db.select({
        id: gameRooms.id,
        joinCode: gameRooms.joinCode,
        status: gameRooms.status,
        mode: gameRooms.mode,
        algorithm: gameRooms.algorithm,
        createdAt: gameRooms.createdAt,
        hostName: players.guestName,
        playersCount: db.$count(gameRooms, eq(gameRooms.id, gameRooms.id)) // Simplified mock count
    })
        .from(gameRooms)
        .leftJoin(players, eq(gameRooms.hostPlayerId, players.id))
        .where(eq(gameRooms.status, 'waiting'))
        .orderBy(desc(gameRooms.createdAt));

    // 2. Map data to the UI format
    const initialRooms = roomsResult.map(r => ({
        id: r.joinCode, // RM-XXX
        name: `${r.algorithm} Match`,
        host: r.hostName || 'Anonymous',
        players: 1, // Will be updated via websocket
        maxPlayers: r.mode === 'Hard' ? 8 : 4,
        ping: `${Math.floor(10 + Math.random() * 40)}ms`,
        difficult: r.mode
    }));

    return {
        initialRooms,
    };
};
