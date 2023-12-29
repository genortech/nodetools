import { env} from '$env/dynamic/private';
import { Resend } from 'resend';

export const resend = new Resend(env.VITE_RESEND_API);
