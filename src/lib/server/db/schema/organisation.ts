import { sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const organisation = sqliteTable('organisation', {
	id: text('id').primaryKey(),
	orgName: text('organisation_name'),
	orgABN: text('organisation_abn'),
	orgAddress: text('organisation_address')
});
