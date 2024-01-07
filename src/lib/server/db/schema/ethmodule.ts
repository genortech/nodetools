import { blob, index, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { project_table } from './projects';
import { sql } from 'drizzle-orm';
import { int } from 'drizzle-orm/mysql-core';

export const earthcalc_table = sqliteTable('earth_drop_calcs', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	projectId: integer('project_id').references(() => project_table.id),
	createAt: integer('created_at', { mode: 'timestamp' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: integer('updated_at', { mode: 'timestamp' }).default(sql`CURRENT_TIMESTAMP`)
});

export const earthMeasurement_table = sqliteTable('earth_measurement', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	earthGeoref: text('earth_georef'),
	createAt: integer('created_at', { mode: 'timestamp' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: integer('updated_at', { mode: 'timestamp' }).default(sql`CURRENT_TIMESTAMP`)
});

export const earth_reading_table = sqliteTable('earth_reading', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	earthMeasurementId: integer('earth_measurement_id').references(() => earthMeasurement_table.id),
	seperation: integer('rod_seperation'),
	earthMeasurement: integer('earth_measurement'),
	resultPhoto: blob('measurement_photo')
});
