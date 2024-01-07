import { redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from '../$types';

export const load: PageServerLoad = async ({ locals, url }) => {
	const session = await locals.auth.validate();
	if (!session) throw redirect(302, '/sigin');
	if (!session.user.emailVerified) {
		throw redirect(302, '/verif/email');
	}
	// ...
	return {
		url: url.pathname
	};
};
