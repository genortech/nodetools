import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.auth.validate();
	if (!session.user.is_admin) {
		redirect(302, '/signin'); // redirect to login page
	}
	return {};
};
