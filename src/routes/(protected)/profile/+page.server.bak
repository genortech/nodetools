// routes/+page.server.ts
import { db } from '$lib/server/db/db';
import { userProfile } from '$lib/server/db/schema/users';
import { auth } from '$lib/server/lucia';
import { fail, redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.auth.validate();
	if (!session) throw redirect(302, '/login');
	const profile = await db
		.select()
		.from(userProfile)
		.where(eq(userProfile.userId, session.user.userId));

	return {
		userId: session.user.userId,
		email: session.user.email,
		profile
	};
};

export const actions: Actions = {
	logout: async ({ locals }) => {
		const session = await locals.auth.validate();
		if (!session) return fail(401);
		await auth.invalidateSession(session.sessionId); // invalidate session
		locals.auth.setSession(null); // remove cookie
		throw redirect(302, '/login'); // redirect to login page
	}
};
