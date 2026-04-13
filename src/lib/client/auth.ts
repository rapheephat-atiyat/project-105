import { createAuthClient } from "better-auth/client";
import { env } from '$env/dynamic/public';

export const authClient = createAuthClient({
    // ถ้าไม่มี PUBLIC_ORIGIN ใน .env ให้เปลี่ยนเป็น 'http://localhost:5173' ไปก่อนได้ครับ
    baseURL: env.PUBLIC_ORIGIN || 'http://localhost:5173'
});