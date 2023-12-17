import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { auth } from '$lib/server/lucia';
import { project } from '$lib/server/db/schema/projects';
import { eq } from 'drizzle-orm';
import { db } from '$lib/server/db/db';

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.auth.validate();
	if (!session) redirect(302, '/login');
	console.log('Retrieve Projects');
	const projects = await db.select().from(project).where(eq(project.userId, session.user.userId));
	return {
		userId: session.user.userId,
		username: session.user.username,
		projects
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
