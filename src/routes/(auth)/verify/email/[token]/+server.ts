import { auth } from '$lib/server/lucia';
import { validateEmailVerificationToken } from '$lib/server/tokens';

import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params, locals }) => {
	const { token } = params;
	try {
		const userId = await validateEmailVerificationToken(token);
		console.log('Validated token', userId);
		const user = await auth.getUser(userId);
		console.log('Got User', user);
		await auth.invalidateAllUserSessions(user.userId);
		console.log('Email validated');
		await auth.updateUserAttributes(user.userId, {
			verified: Number(true) // `Number(true)` if stored as an integer
		});
		console.log('Create Session');
		const session = await auth.createSession({
			userId: user.userId,
			attributes: {}
		});
		locals.auth.setSession(session);
		return new Response(null, {
			status: 302,
			headers: {
				Location: '/'
			}
		});
	} catch {
		return new Response('Invalid email verification link', {
			status: 400
		});
	}
};
