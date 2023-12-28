import { resend } from '$lib/config/resend';
import type { EmailNotification } from '$lib/config/zod-schema';

type EmailNotificationResult = {
	success: boolean;
	error?: string;
};

export async function sendEmail(
	email: string,
	subject: string,
	htmlEmail: string
	// textEmail?: string
): Promise<EmailNotificationResult> {
	console.log('Sending Email Verification', email, subject, htmlEmail);
	try {
		const sendEmail = await resend.emails.send({
			from: 'Acme <onboarding@resend.dev>',
			to: [email],
			subject: subject,
			html: htmlEmail
		});

		console.log('Emal Sent', sendEmail);

		return { success: true };
	} catch (error) {
		const message = error instanceof Error ? error.message : 'Unknown error';
		return { success: false, error: message };
	}
}
