// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
/// <reference types="lucia" />
declare global {
	namespace App {
		interface Locals {
			auth: import('lucia').AuthRequest;
			user: Lucia.UserAttributes;
			startTimer: number;
			error: string;
			errorId: string;
			errorStackTrace: string;
			message: unknown;
			track: unknown;
		}
		interface Error {
			code?: string;
			errorId?: string;
		}
		interface PageData {
			flash?: { type: 'success' | 'error'; message: string };
		}
		// interface Platform {}
	}
	namespace Lucia {
		type Auth = import('$lib/server/lucia').Auth;
		type UserAttributes = {
			userId: string;
			email: string;
			firstName: string;
			lastName: string;
			is_admin: integer;
			verified: boolean;
			receive_email: boolean;
			token: string;
		};
		type DatabaseUserAttributes = {
			email: string;
			verified: integer;
			recieved_email: integer;
			is_admin: integer;
		};
		type DatabaseSessionAttributes = Record<string, never>;
	}
}

export {};
