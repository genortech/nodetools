import { VITE_RESEND_API } from '$env/static/private';
import { Resend } from 'resend';

export const resend = new Resend(VITE_RESEND_API);
