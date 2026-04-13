import { betterAuth } from 'better-auth/minimal';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { sveltekitCookies } from 'better-auth/svelte-kit';
import { env } from '$env/dynamic/private';
import { getRequestEvent } from '$app/server';
import { db } from '$lib/server/db';
import * as schema from './db/schema';

export const auth = betterAuth({
	baseURL: env.ORIGIN || 'http://localhost:5173',
	secret: env.BETTER_AUTH_SECRET,
	database: drizzleAdapter(db, {
		provider: 'pg',
		schema: {
			user: schema.users,
			session: schema.sessions,
			account: schema.accounts,
			verification: schema.verifications
		}
	}),
	emailAndPassword: { enabled: true },
	socialProviders: {
		github: {
			clientId: env.GITHUB_CLIENT_ID!,
			clientSecret: env.GITHUB_CLIENT_SECRET!
		}
	},
	plugins: [
		sveltekitCookies(getRequestEvent)
	]
});