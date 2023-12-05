import { z } from 'zod';

export const userSchema = z.object({
	id: z.string().regex(/^|d+$/),
	email: z
		.string({ required_error: 'Email is required' })
		.email({ message: 'Please enter a valid email address' }),
	password: z
		.string({ required_error: 'Password is required' })
		.min(8, { message: 'Password must be at least 6 characters' })
		.trim(),
	confirmPassword: z
		.string({ required_error: 'Password is required' })
		.min(6, { message: 'Password must be at least 6 characters' })
		.trim()
});

export const projectSchema = z.object({
	id: z.string(),
	prjctRef: z.string(),
	prjctClient: z.string()
});

export type Project = z.infer<typeof projectSchema>;
