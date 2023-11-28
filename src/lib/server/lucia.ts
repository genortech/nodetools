// src/lib/server/lucia.ts
import { lucia } from 'lucia';
import { sveltekit } from 'lucia/middleware';
import { dev } from '$app/environment';
import { client } from './db/db';
import { libsql } from '@lucia-auth/adapter-sqlite';

// expect error (see next section)
export const auth = lucia({
	env: dev ? 'DEV' : 'PROD',
	adapter: libsql(client, {
		user: 'user',
		key: 'user_key',
		session: 'user_session'
	}),
	middleware: sveltekit(),
	getUserAttributes: (data) => {
		return {
			username: data.username
		};
	}
});

export type Auth = typeof auth;
