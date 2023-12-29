import { eq } from 'drizzle-orm';
import { sendPasswordResetEmail } from '$lib/config/email-message';
import { userSchema } from '$lib/config/zod-schema';
import { db } from '$lib/server/db/db';
import { user_table } from '$lib/server/db/schema/users';
import { auth } from '$lib/server/lucia';
import { generatePasswordResetToken } from '$lib/server/tokens';
import { fail } from '@sveltejs/kit';
import { setError, superValidate } from 'sveltekit-superforms/server';

const resetPasswordSchema = userSchema.pick({ email: true });

export const load = async (event) => {
	const form = await superValidate(event, resetPasswordSchema);
	return {
		form
	};
};

export const actions = {
	default: async (event) => {
		const form = await superValidate(event, resetPasswordSchema);
		//console.log(form);

		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		//add user to db
		try {
			console.log('reset user password');
			const storedUser = await db
				.select()
				.from(user_table)
				.where(eq(user_table.email, form.data.email));
			if (!storedUser) {
				return fail(400, {
					message: 'User does not exist'
				});
			}
			console.log('Stored User', storedUser);
			const user = auth.transformDatabaseUser(storedUser);
			console.log('Generating Password', user);
			const token = await generatePasswordResetToken(user.userId);
			await sendPasswordResetEmail(form.data.email, token);
			return {
				success: true
			};
		} catch (e) {
			console.error(e);
			return setError(
				form,
				'The was a problem resetting your password. Please contact support if you need further help.'
			);
		}
	}
};
