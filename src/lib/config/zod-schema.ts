import { z } from 'zod';

export const userSchema = z.object({
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
	projectReference: z.string({ required_error: 'Project Reference is required' }),
	// projectName: z.
	//   string({}),
	projectLocation: z.string({}),
	projectClient: z.string({}),
	// projectBudget: z.
	//   number({}),
	projectStatus: z.string({})
	// startDate: z.
	//   string({}),
});

export const comMaxDemandT3Schema = z.object({
	oLnpVA: z.number().positive().default(50).nullable(),
	oLnpArea: z.number().positive().nullable(),
	oAccVA: z.number().positive().default(35).nullable(),
	oAccArea: z.number().positive().nullable(),
	oAcrcVA: z.number().positive().default(25).nullable(),
	oAcrcArea: z.number().positive().nullable(),
	oAczhVA: z.number().positive().default(50).nullable(),
	oAczhArea: z.number().positive().nullable(),
	oAcvvVA: z.number().positive().default(20).nullable(),
	oAcvvArea: z.number().positive().nullable(),
	cpOaVA: z.number().positive().default(5).nullable(),
	cpOaArea: z.number().positive().nullable(),
	cpOaEVCharging: z.number().positive().default(10).nullable(),
	cpOaEVChargingArea: z.number().positive().nullable(),
	cpBVA: z.number().positive().default(15).nullable(),
	cpBArea: z.number().positive().nullable(),
	cpBEVCharging: z.number().positive().default(20).nullable(),
	cpBEVChargingArea: z.number().positive().nullable(),
	rsLnpVA: z.number().positive().default(70).nullable(),
	rsLnpArea: z.number().positive().nullable(),
	rsAcVA: z.number().positive().default(30).nullable(),
	rsAcArea: z.number().positive().nullable(),
	wLnpVA: z.number().positive().default(10).nullable(),
	wLnpArea: z.number().positive().nullable(),
	wVVA: z.number().positive().default(5).nullable(),
	wVArea: z.number().positive().nullable(),
	wSp: z.number().positive().nullable(),
	liLnpVA: z.number().positive().default(15).nullable(),
	liLnpArea: z.number().positive().nullable(),
	liVVA: z.number().positive().default(15).nullable(),
	liVArea: z.number().positive().nullable(),
	liAcVA: z.number().positive().default(40).nullable(),
	liAcArea: z.number().positive().nullable(),
	liSp: z.number().positive().nullable(),
	tVA: z.number().positive().default(80).nullable(),
	tArea: z.number().positive().nullable(),
	thVA: z.number().positive().default(100).nullable(),
	thArea: z.number().positive().nullable(),
	options: z.string().array().min(1, 'Please pick one option').default(['Office'])
});

export type ComMaxDemandT3Schema = z.infer<typeof comMaxDemandT3Schema>;
// export type ResMaxDemandSchema = z.infer<typeof resMaxDemandSchema>;
// export type EarthingSchema = z.infer<typeof earthingSchema>;
// export type SignInSchema = z.infer<typeof userSchema>;
// export type ProjectSchema = z.infer<typeof projectSchema>;
// export type EmailNotification = z.infer<typeof emailNotificationSchema>;
