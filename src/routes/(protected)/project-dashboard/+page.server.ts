import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { auth } from '$lib/server/lucia';
import { eq } from 'drizzle-orm';
import { db } from '$lib/server/db/db';
import { project_table } from '$lib/server/db/schema/projects';

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.auth.validate();
	if (!session) redirect(302, '/signin');
	if (!session.user.emailVerified) {
		redirect(302, '/verify/email');
	}
	const user_projects = await db
		.select()
		.from(project_table)
		.where(eq(project_table.userId, session.user.userId));
	console.log('Retrieve Projects');
	// const user_projects = await db.select().from(projects).where(eq(projects.userId, session.user.userId));
	return {
		userId: session.user.userId,
		username: session.user.email,
		user_projects
	};
};

export const actions: Actions = {
	logout: async ({ locals }) => {
		const session = await locals.auth.validate();
		if (!session) return fail(401);
		await auth.invalidateSession(session.sessionId); // invalidate session
		locals.auth.setSession(null); // remove cookie
		redirect(302, '/login'); // redirect to login page
	}
};
