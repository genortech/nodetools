// routes/login/+page.server.ts
import { auth } from '$lib/server/lucia';
import { fail, redirect } from '@sveltejs/kit';
import { LuciaError } from 'lucia';
import type { Actions, PageServerLoad } from './$types';
import { userSchema } from '$lib/config/zod-schema';
import { setError, superValidate } from 'sveltekit-superforms/server';

const signinSchema = userSchema.pick({
	email: true,
	password: true
});

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.auth.validate();

	if (session) {
		if (!session.user.emailVerified) return redirect(302, '/verify/email');
		redirect(302, '/project-dashboard');
	}

	const signinForm = await superValidate(signinSchema);
	return { signinForm };
};

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const signinForm = await superValidate(request, signinSchema);
		console.log('POST', signinForm);

		if (!signinForm.valid) {
			return fail(400, { signinForm });
		}
		try {
			// find user by key
			// and validate password
			const key = await auth.useKey(
				'email',
				signinForm.data.email.toLowerCase(),
				signinForm.data.password
			);
			const session = await auth.createSession({
				userId: key.userId,
				attributes: {}
			});
			locals.auth.setSession(session); // set session cookie
		} catch (e) {
			if (
				e instanceof LuciaError &&
				(e.message === 'AUTH_INVALID_KEY_ID' || e.message === 'AUTH_INVALID_PASSWORD')
			) {
				// user does not exist
				// or invalid password
				return fail(400, {
					message: 'Incorrect email or password'
				});
			}

			return fail(500, {
				message: 'An unknown error occurred'
			});
		}
		// redirect to
		// make sure you don't throw inside a try/catch block!
		return { signinForm };
	}
};
