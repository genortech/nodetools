import { z } from 'zod';

export const emailNotificationSchema = z.object({
	subject: z.string(),
	content: z.string()
});

export type EmailNotification = z.infer<typeof emailNotificationSchema>;

export const userSchema = z.object({
	id: z.string().regex(/^|d+$/),
	email: z
		.string({ required_error: 'Email is required' })
		.email({ message: 'Please enter a valid email address' }),
	password: z
		.string({ required_error: 'Password is required' })
		.min(8, { message: 'Password must be at least 6 characters' })
		.trim(),
	role: z
		.enum(['USER', 'PREMIUM', 'ADMIN'], { required_error: 'You must have a role' })
		.default('USER'),
	verified: z.boolean().default(false),
	recieved_email: z.boolean().default(false),
	confirmPassword: z
		.string({ required_error: 'Password is required' })
		.min(6, { message: 'Password must be at least 6 characters' })
		.trim(),
	createdAt: z.date().optional(),
	updatedAt: z.date().optional()
});

export type UserSchema = typeof userSchema;

export const userUpdatePasswordSchema = userSchema
	.pick({ password: true, confirmPassword: true })
	.superRefine(({ confirmPassword, password }, ctx) => {
		if (confirmPassword !== password) {
			ctx.addIssue({
				code: 'custom',
				message: 'Password and Confirm Password must match',
				path: ['password']
			});
			ctx.addIssue({
				code: 'custom',
				message: 'Password and Confirm Password must match',
				path: ['confirmPassword']
			});
		}
	});

export type UserUpdatePasswordSchema = typeof userUpdatePasswordSchema;

export const projectSchema = z.object({
	id: z.string(),
	prjctRef: z.string(),
	prjctClient: z.string()
});

export type Project = z.infer<typeof projectSchema>;
