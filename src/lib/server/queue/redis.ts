import Redis from 'ioredis';
import { env } from '$env/dynamic/private';

export const redisConnection = new Redis(env.REDIS_URL || 'redis://localhost:6379', {
    maxRetriesPerRequest: null
});

redisConnection.on('error', (err) => {
    console.error('Redis Connection Error:', err);
});