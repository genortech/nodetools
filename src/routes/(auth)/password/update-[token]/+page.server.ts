import { userUpdatePasswordSchema } from '$lib/config/zod-schema';
import { db } from '$lib/server/db/db';
import { passwordVerification_table, user_table } from '$lib/server/db/schema/users';
import { auth } from '$lib/server/lucia';
import { fail, redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { setError, superValidate } from 'sveltekit-superforms/server';

export const load = async (event) => {
	const form = await superValidate(event, userUpdatePasswordSchema);
	return {
		form
	};
};

export const actions = {
	default: async (event) => {
		const form = await superValidate(event, userUpdatePasswordSchema);
		console.log('POST', form);

		if (!form.valid) {
			return fail(400, {
				form
			});
		}
		//add user to db
		try {
			const token = event.params.token as string;
			console.log('update user password');
			const newToken = crypto.randomUUID();
			//get email from token
			const user_id = await db
				.select({ id: passwordVerification_table.userId })
				.from(passwordVerification_table)
				.where(eq(passwordVerification_table.token, token));

			if (user_table?.email) {
				await auth.updateKeyPassword('email', user_table.email, form.data.password);
				// need to update with new token because token is also used for verification
				// and needs a new verification token in case user has not verified their account
				// and already forgot their password before verifying. Now they can get a new one resent.
				await db
					.update(passwordVerification_table)
					.set({ token: newToken })
					.where(eq(passwordVerification_table.token, token));
			} else {
				return setError(
					form,
					'Email address not found for this token. Please contact support if you need further help.'
				);
			}
		} catch (e) {
			console.error(e);
			return setError(
				form,
				'The was a problem resetting your password. Please contact support if you need further help.'
			);
		}
		const token = event.params.token as string;
		redirect(302, `/auth/password/update-${token}/success`);
		//		return { form };
	}
};
