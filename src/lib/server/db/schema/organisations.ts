import { sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const organisation_table = sqliteTable('organisation', {
	id: text('id').primaryKey(),
	orgName: text('organisation_name'),
	orgABN: text('organisation_abn'),
	orgWebsite: text('organisation_website'),
	orgEmail: text('organisation_email'),
	orgAddress: text('organisation_address')
});
