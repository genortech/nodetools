import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import { env } from '$env/dynamic/private';

export const client = createClient({
	url: env.VITE_TURSO_DB_URL,
	authToken: env.VITE_TURSO_DB_AUTH_TOKEN || ''
});

export const db = drizzle(client, { logger: true });
