import { redirect, fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { generateEmailVerificationToken } from '$lib/server/tokens';
import { sendVerificationEmail } from '$lib/config/email-message';

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.auth.validate();
	if (!session) throw redirect(302, '/login');
	if (session.user.emailVerified) {
		throw redirect(302, '/');
	}
	return {};
};

export const actions: Actions = {
	default: async ({ locals }) => {
		const session = await locals.auth.validate();
		if (!session) throw redirect(302, '/login');
		if (session.user.emailVerified) {
			throw redirect(302, '/');
		}
		try {
			const token = await generateEmailVerificationToken(session.user.userId);
			await sendVerificationEmail(session.user.email, token);
			return {
				success: true
			};
		} catch {
			return fail(500, {
				message: 'An unknown error occurred'
			});
		}
	}
};
