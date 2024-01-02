import { index, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { project_table } from './projects';
import { sql } from 'drizzle-orm';

export const cbpl_table = sqliteTable('cable_pull_calcs', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	projectId: integer('project_id').references(() => project_table.id),
	createAt: integer('created_at', { mode: 'timestamp' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: integer('updated_at', { mode: 'timestamp' }).default(sql`CURRENT_TIMESTAMP`)
});
