import { index, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { project_table } from './projects';
import { sql } from 'drizzle-orm';

export const vdcalc_table = sqliteTable('voltage_drop_calcs', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	projectId: integer('project_id').references(() => project_table.id),
	cableLength: integer('cable_length'),
	cableType: text('cable_type'),
	cableResistance: integer('cable_resistance'),
	voltageDrop: integer('voltage_drop'),
	createAt: integer('created_at', { mode: 'timestamp' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: integer('updated_at', { mode: 'timestamp' }).default(sql`CURRENT_TIMESTAMP`)
});
