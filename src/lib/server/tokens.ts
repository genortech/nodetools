// lib/server/token.ts
import { generateRandomString, isWithinExpiration } from 'lucia/utils';
import { db } from './db/db';
import { eq } from 'drizzle-orm';
import { emailVerification_table } from './db/schema/users';

const EXPIRES_IN = 1000 * 60 * 60 * 2; // 2 hours

export const generateEmailVerificationToken = async (userId: string) => {
	const storedUserTokens = await db
		.select()
		.from(emailVerification_table)
		.where(eq(emailVerification_table.userId, userId));
	if (storedUserTokens.length > 0) {
		const reusableStoredToken = storedUserTokens.find((token) => {
			// check if expiration is within 1 hour
			// and reuse the token if true
			return isWithinExpiration(Number(token.expires) - EXPIRES_IN / 2);
		});
		if (reusableStoredToken) return reusableStoredToken.id;
	}
	const token = generateRandomString(63);
	await db.insert(emailVerification_table).values({
		id: token,
		expires: (new Date().getTime() + EXPIRES_IN) as unknown as bigint,
		userId: userId
	});

	return token;
};

export const validateEmailVerificationToken = async (token: string) => {
	const storedToken = await db.transaction(async (trx) => {
		const [storedToken] = await trx
			.select()
			.from(emailVerification_table)
			.where(eq(emailVerification_table.id, token));
		if (!storedToken) throw new Error('Invalid token');
		console.log('Token deleting');
		await trx.delete(emailVerification_table).where(eq(emailVerification_table.id, token));
		console.log('Token deleted');
		return storedToken;
	});
	console.log('Stored Token', storedToken);
	const tokenExpires = Number(storedToken.expires); // bigint => number conversion
	if (!isWithinExpiration(tokenExpires)) {
		throw new Error('Expired token');
	}
	return storedToken.userId;
};
