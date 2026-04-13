import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { users } from '$lib/server/db/schema';
import { desc } from 'drizzle-orm';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
    try {
        const topUsers = await db.query.users.findMany({
            orderBy: [desc(users.rankScore)],
            limit: 50,
            columns: {
                id: true,
                name: true,
                image: true,
                rankScore: true
            }
        });

        return json({ success: true, data: topUsers });
    } catch (err) {
        console.error(err);
        return json({ success: false, error: 'Failed to fetch leaderboard' }, { status: 500 });
    }
};