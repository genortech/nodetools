import { relations, sql } from 'drizzle-orm';
import { blob, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { organisation } from './organisation';

export const user = sqliteTable('user', {
	id: text('id').primaryKey(),
	email: text('email').unique(),
	is_admin: integer('is_admin', { mode: 'boolean' }),
	username: text('username').notNull().unique(),
	organisationId: text('organisation_id').references(() => organisation.id),
	createAt: integer('created_at', { mode: 'timestamp' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: integer('updated_at', { mode: 'timestamp' }).default(sql`CURRENT_TIMESTAMP`)
});

export const insertUserSchema = createInsertSchema(user);
export const selectUserSchema = createSelectSchema(user);

export const key = sqliteTable('user_key', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id),
	hashPassword: text('hashed_password')
});

export const insertUserKeySchema = createInsertSchema(key);
export const selectUserKeySchema = createSelectSchema(key);

export const session = sqliteTable('user_session', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id),
	activeExpires: blob('active_expires', { mode: 'bigint' }).notNull(),
	idleExpires: blob('idle_expires', { mode: 'bigint' }).notNull()
});

export const insertUserSessionSchema = createInsertSchema(session);
export const selectUserSessionSchema = createSelectSchema(session);

export const userProfile = sqliteTable('user_profile', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id),
	profile: blob('profile'),
	avatarUrl: text('avatar_url')
});

export const userOneRelations = relations(user, ({ one }) => ({
	organization: one(organisation, {
		fields: [user.organisationId],
		references: [organisation.id]
	}),
	profile: one(userProfile, {
		fields: [user.id],
		references: [userProfile.userId]
	})
}));
