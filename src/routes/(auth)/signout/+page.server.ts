import { auth } from '$lib/server/lucia';
import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ locals }) => {
		const session = await locals.auth.validate();
		console.log('Session Signout', session);
		if (!session) {
			throw redirect(302, '/signin');
		}
		console.log('Session Invlaidated');
		await auth.invalidateSession(session.sessionId); // invalidate session
		locals.auth.setSession(null); // remove cookie
		throw redirect(302, '/signin');
	}
};
