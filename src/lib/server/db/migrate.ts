import { migrate } from 'drizzle-orm/libsql/migrator';
import { db } from './db';

async function main() {
	await migrate(db, { migrationsFolder: 'migrations' });
	console.log('Alllriiiight Migrated Successfully');
	process.exit(0);
}

main().catch((err) => {
	console.error('Oh No Migration Failed');
	console.error(err);
	process.exit(1);
});
