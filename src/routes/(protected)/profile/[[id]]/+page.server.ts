import { superValidate, message } from 'sveltekit-superforms/server';
import { error, fail, redirect } from '@sveltejs/kit';
import { userProfileSchema, userSchema } from '$lib/config/zod-schema';
import { user_table } from '$lib/server/db/schema/users';
import { eq } from 'drizzle-orm';
import { db } from '$lib/server/db/db';

const profileSchema = userSchema
	.pick({
		email: true
	})
	.merge(
		userProfileSchema.pick({
			firstName: true,
			lastName: true,
			profile: true,
			avatarUrl: true
		})
	);

export const load = async ({ urls, params }) => {
	const currentUser = await db.select().from(user_table).where(eq(user_table.id, params.id));

	if (currentUser[0].id && params.id) {
		error(404, 'User not found!!');
	}

	const form = await superValidate(profileSchema);

	return { form, currentUser };
};

export const actions = {
	default: async ({ request, params }) => {
		const form = await superValidate(request, profileSchema);
		return { form };
	}
};
