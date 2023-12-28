// routes/signup/+page.server.ts
import { auth } from '$lib/server/lucia';
import { fail, redirect } from '@sveltejs/kit';

import type { PageServerLoad, Actions } from './$types';
import { LibsqlError } from '@libsql/client';
import { userSchema } from '$lib/config/zod-schema';
import { superValidate } from 'sveltekit-superforms/server';
import { generateEmailVerificationToken } from '$lib/server/tokens';
import { sendVerificationEmail } from '$lib/config/email-message';

const signupSchema = userSchema.pick({
	email: true,
	password: true
});

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.auth.validate();

	if (session) {
		if (!session.user.emailVerified) {
			redirect(302, '/verify/email');
		}
		redirect(302, '/dashboard');
	}
	const signupForm = await superValidate(signupSchema);
	return { signupForm };
};

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const signupForm = await superValidate(request, signupSchema);

		console.log('POST', signupForm);
		const password = signupForm.data.password;
		const email = signupForm.data.email;
		// basic check

		if (!signupForm.valid) {
			return fail(400, { signupForm, message: 'Invalid email' });
		}
		console.log('Create User');
		try {
			const user = await auth.createUser({
				key: {
					providerId: 'email', // auth method
					providerUserId: email.toLowerCase(), // unique id when using "username" auth method
					password // hashed by Lucia
				},
				attributes: {
					email: email.toLowerCase(),
					verified: Number(false),
					recieved_email: Number(true),
					is_admin: Number(false)
				}
			});
			console.log('Create Session');
			const session = await auth.createSession({
				userId: user.userId,
				attributes: {}
			});

			locals.auth.setSession(session); // set session cookie

			const token = await generateEmailVerificationToken(user.userId);
			await sendVerificationEmail(email, token);
		} catch (err) {
			// this part depends on the database you're using
			// check for unique constraint error in user table
			if (err instanceof LibsqlError && err.code === 'SQLITE_CONSTRAINT') {
				console.log('Error', err);
				return fail(400, {
					message: 'Email is already taken'
				});
			}
			return fail(500, {
				message: 'An unknown error occurred'
			});
		}
		// redirect to
		// make sure you don't throw inside a try/catch block!
		redirect(302, '/verify/email');
	}
};
