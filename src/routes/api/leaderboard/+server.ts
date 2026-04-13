import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { users } from '$lib/server/db/schema';
import { desc } from 'drizzle-orm';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
    const topUsers = await db.select({
        id: users.id,
        email: users.email,
        image: users.image,
        rankScore: users.rankScore
    })
        .from(users)
        .orderBy(desc(users.rankScore))
        .limit(50);

    return json(topUsers);
};