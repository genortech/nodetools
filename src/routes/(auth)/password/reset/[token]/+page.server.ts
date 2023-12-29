import { fail, redirect } from '@sveltejs/kit';
import { setError, superValidate } from 'sveltekit-superforms/server';
import { userUpdatePasswordSchema } from '$lib/config/zod-schema';
import { auth } from '$lib/server/lucia';
import { validatePasswordResetToken } from '$lib/server/tokens';

export const load = async (event) => {
	const form = await superValidate(event, userUpdatePasswordSchema);
	return {
		form
	};
};

export const actions = {
	default: async (event) => {
		const form = await superValidate(event, userUpdatePasswordSchema);
		//console.log(form);

		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		//add user to db
		try {
			const token = event.params.token as string;
			console.log('update user password');
			const userId = await validatePasswordResetToken(token);
			let user = await auth.getUser(userId);
			await auth.invalidateAllUserSessions(user.userId);
			await auth.updateKeyPassword('email', user.email, form.data.password);
			if (!user.emailVerified) {
				user = await auth.updateUserAttributes(user.userId, {
					verified: Number(true)
				});
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
		throw redirect(302, `/`);
	}
};
