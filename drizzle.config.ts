import { type Config } from 'drizzle-kit';
import { loadEnv } from 'vite';

const env = loadEnv('development', process.cwd(), '');

export default {
	out: './migrations',
	schema: './src/lib/server/db/schema/*.ts',
	driver: 'turso',
	dbCredentials: {
		url: env.VITE_TURSO_DB_URL || '',
		authToken: env.VITE_TURSO_DB_AUTH_TOKEN || ''
	},
	verbose: true,
	strict: true,
	tablesFilter: ['!libsql_wasm_func_table']
} satisfies Config;
