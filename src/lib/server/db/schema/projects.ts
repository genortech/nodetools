import { index, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { user_table } from './users';
import { relations, sql } from 'drizzle-orm';
import { organisation_table } from './organisations';

export const project_table = sqliteTable(
	'project',
	{
		id: integer('id').primaryKey({ autoIncrement: true }),
		prjctRef: text('project_reference').notNull(),
		prjctClient: text('client_name'),
		prjctLocation: text('project_location'),
		userId: text('user_id').references(() => user_table.id, { onDelete: 'cascade' }),
		hasVdCalc: integer('has_vd_calc', { mode: 'boolean' }),
		hasMdCalc: integer('has_md_calc', { mode: 'boolean' }),
		hasEarthCalc: integer('has_earthing_calc', { mode: 'boolean' }),
		hasCableCalc: integer('has_cablepull_calc', { mode: 'boolean' }),
		organisationId: text('company_id').references(() => organisation_table.id),
		prjctStatus: text('project_status').notNull(),
		prjctPriority: text('project_priority'),
		notes: text('notes'),
		createAt: integer('created_at', { mode: 'timestamp' }).default(sql`CURRENT_TIMESTAMP`),
		updatedAt: integer('updated_at', { mode: 'timestamp' }).default(sql`CURRENT_TIMESTAMP`)
	},
	(table) => {
		return {
			userIdIdx: index('user_id_idx').on(table.userId)
		};
	}
);

export const projectOneRelations = relations(project_table, ({ one }) => ({
	author: one(user_table, {
		fields: [project_table.userId],
		references: [user_table.id]
	}),
	organisation: one(organisation_table, {
		fields: [project_table.organisationId],
		references: [organisation_table.id]
	})
}));
