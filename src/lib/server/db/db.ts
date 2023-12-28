import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import { env } from '$env/dynamic/private';
import * as usrSchema from './schema/users';
import * as prjctSchema from './schema/projects';
import * as orgSchema from './schema/organisations';

export const client = createClient({
	url: env.VITE_TURSO_DB_URL,
	authToken: env.VITE_TURSO_DB_AUTH_TOKEN || ''
});

export const db = drizzle(client, {
	schema: { ...usrSchema, ...prjctSchema, ...orgSchema },
	logger: true
});
