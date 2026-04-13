import { json } from '@sveltejs/kit';
import { auth } from '$lib/server/auth';

export const checkAuth = async (headers: Headers) => {
    const session = await auth.api.getSession({ headers });
    if (!session) throw new Error('Unauthorized');
    return session;
};

export const sendSuccess = (data: any = null, status = 200) => {
    return json({ success: true, data }, { status });
};

export const sendError = (error: string, status = 400) => {
    return json({ success: false, error }, { status });
};