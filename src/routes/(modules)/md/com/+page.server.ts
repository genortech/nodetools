import { comMaxDemandT3Schema, type ComMaxDemandT3Schema } from '$lib/config/zod-schema';
import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import type { Actions, PageServerLoad } from './$types';
const comMaxDemandT3FormSchema = comMaxDemandT3Schema.pick({
	oLnpVA: true,
	oLnpArea: true,
	oAccVA: true,
	oAccArea: true,
	oAcrcVA: true,
	oAcrcArea: true,
	oAczhVA: true,
	oAczhArea: true,
	oAcvvVA: true,
	oAcvvArea: true,
	cpOaVA: true,
	cpOaArea: true,
	cpOaEVCharging: true,
	cpOaEVChargingArea: true,
	cpBVA: true,
	cpBArea: true,
	cpBEVCharging: true,
	cpBEVChargingArea: true,
	rsLnpVA: true,
	rsLnpArea: true,
	rsAcVA: true,
	rsAcArea: true,
	wLnpVA: true,
	wLnpArea: true,
	wVVA: true,
	wVArea: true,
	wSp: true,
	liLnpVA: true,
	liLnpArea: true,
	liVVA: true,
	liVArea: true,
	liAcVA: true,
	liAcArea: true,
	liSp: true,
	tVA: true,
	tArea: true,
	thVA: true,
	thArea: true,
	options: true
});

export const load: PageServerLoad = async ({ locals }) => {
	const comMaxDemandT3Form = await superValidate(comMaxDemandT3FormSchema);

	return { comMaxDemandT3Form };
};

export const actions: Actions = {
	t3Form: async ({ request }) => {
		const comMaxDemandT3Form = await superValidate(request, comMaxDemandT3FormSchema);
		console.log('POST', comMaxDemandT3Form);

		if (!comMaxDemandT3Form.valid) {
			return fail(400, { comMaxDemandT3Form });
		}

		return { comMaxDemandT3Form };
	}

	// t2Form: async ({ request }) => {
	// 	const comMaxDemandT2Form = await superValidate(request, comMaxDemandT2FormSchema);
	// 	console.log('POST', comMaxDemandT2Form);
	//
	// 	if (!comMaxDemandT2Form.valid) {
	// 		return fail(400, { comMaxDemandT2Form });
	// 	}
	// 	return { comMaxDemandT2Form };
	// }
};
