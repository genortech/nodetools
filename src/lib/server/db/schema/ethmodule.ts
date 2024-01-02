import { index, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { project_table } from './projects';
import { sql } from 'drizzle-orm';

export const earthcalc_table = sqliteTable('earth_drop_calcs', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	projectId: integer('project_id').references(() => project_table.id),
	earthDrop: integer('earth_drop'),
	createAt: integer('created_at', { mode: 'timestamp' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: integer('updated_at', { mode: 'timestamp' }).default(sql`CURRENT_TIMESTAMP`)
});
