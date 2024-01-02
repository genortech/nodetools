import type { PageServerLoad } from '../$types';
import { db } from '$lib/server/db/db';
import { project_table } from '$lib/server/db/schema/projects';
import { eq } from 'drizzle-orm';

export const load: PageServerLoad = async ({ locals, params }) => {
	const session = await locals.auth.validate();
	const project = await db.select().from(project_table).where(eq(project_table.id, params.id));
	if (!session) {
		throw new Error('unauthorized');
	}
	console.log('Project Id', params);
	return {
		project
	};
};
