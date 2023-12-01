import { index, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { user } from './user';
import { relations, sql } from 'drizzle-orm';
import { organisation } from './organisation';

export const project = sqliteTable(
	'project',
	{
		id: integer('id').primaryKey({ autoIncrement: true }),
		prjctRef: text('project_reference').notNull(),
		prjctClient: text('client_name'),
		userId: text('user_id').references(() => user.id),
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

export const projectOneRelations = relations(project, ({ one }) => ({
	author: one(user, {
		fields: [project.userId],
		references: [user.id]
	})
	// organization: one(organisation, {
	// 	fields: [project.organisationId],
	// 	references: [organisation.id]
	// })
}));
