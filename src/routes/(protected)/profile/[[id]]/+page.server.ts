import { superValidate, message } from 'sveltekit-superforms/server';
import { error, fail, redirect } from '@sveltejs/kit';
import { userSchema } from '$lib/config/zod-schema';
import { user_table } from '$lib/server/db/schema/users';
import { eq } from 'drizzle-orm';
import { db } from '$lib/server/db/db';

const crudSchema = userSchema.extend({
	id: userSchema.shape.id.optional()
});

export const load = async ({ urls, params }) => {
	const currentUser = await db.select().from(user_table).where(eq(user_table.id, params.id));

	if (currentUser[0].id && params.id) {
		error(404, 'User not found!!');
	}

	const form = await superValidate(currentUser, crudSchema);

	return { form, currentUser };
};

export const actions = {
	default: async ({ request, params }) => {
    const formData = await.request.formData()
		const form = await superValidate(request, crudSchema);
		const currentUser = await db.select().from(user_table).where(eq(user_table.id, params.id));

		if (!form.valid) return fail(400, { form });

		if (!form.data.id) {


      // UPDATE user
			if (index == -1) error(404, 'User not found.');



		 if (formData.has('delete')) {
        // DELETE user
        currentUser.splice(index, 1);
        redirect(303, '/users');
      } else {
        // UPDATE user
        user_table[index] = { ...form.data, id: form.data.id };
        return message(form, 'User updated!');
      }
		return { form };
	}
}};
