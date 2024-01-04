import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import { VITE_TURSO_DB_URL, VITE_TURSO_DB_AUTH_TOKEN } from '$env/static/private';
import * as usrSchema from './schema/users';
import * as prjctSchema from './schema/projects';
import * as orgSchema from './schema/organisations';

export const client = createClient({
	url: VITE_TURSO_DB_URL,
	authToken: VITE_TURSO_DB_AUTH_TOKEN || ''
});

export const db = drizzle(client, {
	schema: { ...usrSchema, ...prjctSchema, ...orgSchema },
	logger: true
});
