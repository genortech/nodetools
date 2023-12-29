import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { db } from '$lib/server/db/db';
import { project_table } from '$lib/server/db/schema/projects';

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.auth.validate();
	if (!session) redirect(302, '/sigin');

	return {
		userId: session.user.userId,
		email: session.user.email
	};
};

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const session = await locals.auth.validate();
		const formData = await request.formData();

		console.log('POST', formData);
		if (!session) redirect(302, '/signin');

		type NewProject = typeof project_table.$inferInsert;

		const insertProject = async (newproject: NewProject) => {
			return db.insert(project_table).values(newproject);
		};
		const newProject: NewProject = {
			prjctRef: formData.get('project_reference') as string,
			prjctClient: formData.get('client_name') as string,
			userId: session.user.userId
		};
		await insertProject(newProject);
	}
};
