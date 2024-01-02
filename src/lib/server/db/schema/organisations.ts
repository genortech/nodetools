import { index, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const organisation_table = sqliteTable(
	'organisation',
	{
		id: text('id').primaryKey(),
		orgName: text('organisation_name').unique(),
		orgABN: text('organisation_abn'),
		orgWebsite: text('organisation_website'),
		orgEmail: text('organisation_email'),
		orgAddress: text('organisation_address')
	},
	(table) => {
		return {
			orgIdIdx: index('org_id_idx').on(table.id)
		};
	}
);
