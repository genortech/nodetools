import { fail, redirect } from '@sveltejs/kit';

import type { Actions, PageServerLoad } from './$types';
import { auth } from '$lib/server/lucia';
import { db } from '$lib/server/db/db';
import { userProfile } from '$lib/server/db/schema/user';
import { eq } from 'drizzle-orm';
import { project } from '$lib/server/db/schema/project';

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.auth.validate();
	if (!session) throw redirect(302, '/login');

	return {
		userId: session.user.userId,
		username: session.user.username
	};
};

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const session = await locals.auth.validate();
		const formData = await request.formData();

		console.log('POST', formData);
		if (!session) throw redirect(302, '/login');

		type NewProject = typeof project.$inferInsert;

		const insertProject = async (newproject: NewProject) => {
			return db.insert(project).values(newproject);
		};
		const newProject: NewProject = {
			prjctRef: formData.get('project_reference') as string,
			prjctClient: formData.get('client_name') as string,
			userId: session.user.userId
		};
		await insertProject(newProject);
	}
};
