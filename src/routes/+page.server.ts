// routes/+page.server.ts
import { fail, redirect } from '@sveltejs/kit';

import type { Actions, PageServerLoad } from './$types';
import { auth } from '$lib/server/lucia';

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.auth.validate();
	if (session) redirect(302, '/project-dashboard');
};

export const actions: Actions = {
	logout: async ({ locals }) => {
		const session = await locals.auth.validate();
		if (!session) return fail(401);
		await auth.invalidateSession(session.sessionId); // invalidate session
		locals.auth.setSession(null); // remove cookie
		redirect(302, '/signin'); // redirect to login page
	}
};
