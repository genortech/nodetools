import { relations, sql } from 'drizzle-orm';
import { blob, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { organisation_table } from './organisations';

export const user_table = sqliteTable('user', {
	id: text('id').primaryKey(),
	email: text('email').unique().notNull(),
	is_admin: integer('is_admin', { mode: 'boolean' }),
	organisationId: text('organisation_id').references(() => organisation_table.id),
	verified: integer('verified', { mode: 'boolean' }),
	recieved_email: integer('recieved_email', { mode: 'boolean' }),
	createAt: integer('created_at', { mode: 'timestamp' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: integer('updated_at', { mode: 'timestamp' }).default(sql`CURRENT_TIMESTAMP`)
});

export const insertUserSchema = createInsertSchema(user_table);
export const selectUserSchema = createSelectSchema(user_table);

export const key_table = sqliteTable('user_key', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => user_table.id),
	hashPassword: text('hashed_password')
});

export const insertUserKeySchema = createInsertSchema(key_table);
export const selectUserKeySchema = createSelectSchema(key_table);

export const session_table = sqliteTable('user_session', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => user_table.id),
	activeExpires: blob('active_expires', { mode: 'bigint' }).notNull(),
	idleExpires: blob('idle_expires', { mode: 'bigint' }).notNull()
});

export const insertUserSessionSchema = createInsertSchema(session_table);
export const selectUserSessionSchema = createSelectSchema(session_table);

export const userProfile_table = sqliteTable('user_profile', {
	id: text('id').primaryKey(),
	firstName: text('first_name'),
	lastName: text('first_name'),
	userId: text('user_id')
		.notNull()
		.references(() => user_table.id, { onDelete: 'cascade' }),
	profile: blob('profile'),
	avatarUrl: text('avatar_url')
});

export const passwordVerification_table = sqliteTable('password_verification', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => user_table.id),
	token: text('token'),
	expires: blob('expires', { mode: 'bigint' }).notNull()
});

export const emailVerification_table = sqliteTable('email_verification', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => user_table.id),
	expires: blob('expires', { mode: 'bigint' }).notNull()
});

export const userOneRelations = relations(user_table, ({ one }) => ({
	organisation: one(organisation_table, {
		fields: [user_table.organisationId],
		references: [organisation_table.id]
	}),
	profile: one(userProfile_table, {
		fields: [user_table.id],
		references: [userProfile_table.userId]
	})
}));
