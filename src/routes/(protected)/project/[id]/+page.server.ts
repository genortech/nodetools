import { project } from '$lib/server/db/schema/projects';
import { eq } from 'drizzle-orm';
import type { PageServerLoad } from '../$types';
import { db } from '$lib/server/db/db';

export const load: PageServerLoad = async ({ locals, params }) => {
	const session = await locals.auth.validate();
	if (!session) {
		throw new Error('unauthorized');
	}
	const param = params;
	console.log('Project Id', params);
	return {
		project: await db.select().from(project).where(eq(project.id, params.id)).limit(1)
	};
};
