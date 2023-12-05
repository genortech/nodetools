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
		userId: text('user_id').references(() => user_table.id, { onDelete: 'cascade' }),
		// organisationId: text('company_id').references(() => organisation.id),
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
	})
	// organization: one(organisation, {
	// 	fields: [project.organisationId],
	// 	references: [organisation.id]
	// })
}));
