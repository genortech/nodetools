<script lang="ts">
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Switch } from '$lib/components/ui/switch';
	import { superForm } from 'sveltekit-superforms/client';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import { get } from 'svelte/store';
	let tableMode = false;
	let officeMode = false;
	let carparksMode = false;
	let retailMode = false;
	let warehouseMode = false;
	let lightIndMode = false;
	let tavernsMode = false;
	let theatresMode = false;
	let officeTotal = 0;
	let carparkTotal = 0;
	let retailTotal = 0;
	let warehouseTotal = 0;
	let lightIndTotal = 0;
	let tavernsTotal = 0;
	let theatresTotal = 0;
	let grandTotal = 0;
	let t3_menu = [
		'Office',
		'Carpark',
		'Retail Shops',
		'Warehouse',
		'Theater',
		'Taverns and Clubs',
		'Light Industrial'
	];

	export let data;
	const { form, enhance, formId, errors, message } = superForm(data.comMaxDemandT3Form, {
		clearOnSubmit: 'none',
		id: 't3form'
		// onUpdate: (form) => {
		// 	let thVA: number | null = form.form.data.thVA;
		// 	let thArea: number | null = form.form.data.thArea;
		// 	console.log('VA and Area', thVA, thArea);
		// 	return (theatresTotal = thVA * thArea);
		// }
	});
	function calcTotal() {
		let grandTotal = theatresTotal + tavernsTotal + lightIndTotal;
		return grandTotal;
	}
</script>

<SuperDebug data={{ $formId, $form }} />
<br />
<div class="flex flex-col items-center justify-center">
	<div class="flex flex-row items-center justify-center gap-3">
		<Label for="calcTable-mode">Table C3</Label>
		<Switch id="calcTable-mode" name="calcTable-mode" bind:checked={tableMode} />
		<Label for="calcTable-mode">Table C2</Label>
		<hr />
	</div>
	{#if tableMode === false}
		<h1 class="text-2xl">Table C3</h1>
		<hr />

		<div class="flex flex-row items-center justify-center gap-4">
			<input type="hidden" name="__superform_id" value={$formId} />
			<Label id="office-label" for="office-mode">Office:</Label>
			<Checkbox id="office-mode" bind:checked={officeMode} aria-labelledby="office-label" />
			<Label id="carpark-label" for="carpark-mode">Carparks:</Label>
			<Checkbox id="carpark-mode" bind:checked={carparksMode} aria-labelledby="carpark-label" />
			<Label id="retail-label" for="retail-mode">Retail Shops:</Label>
			<Checkbox id="retail-mode" bind:checked={retailMode} aria-labelledby="retail-label" />
			<Label id="warehouse-label" for="warehouse-mode">Warehouses:</Label>
			<Checkbox
				id="warehouse-mode"
				bind:checked={warehouseMode}
				aria-labelledby="warehouse-label"
			/>
			<Label id="light-ind-label" for="lightInd-mode">Light Industrial:</Label>
			<Checkbox id="light-ind-mode" bind:checked={lightIndMode} aria-labelledby="light-ind-label" />
			<Label id="taverns-label" for="taverns-mode">Taverns and Clubs:</Label>
			<Checkbox id="taverns-mode" bind:checked={tavernsMode} aria-labelledby="taverns-label" />
			<Label id="theatres-label" for="theatres-mode">Theatres:</Label>
			<Checkbox id="theatres-mode" bind:checked={theatresMode} aria-labelledby="theatres-label" />
			<br />
		</div>

		<form method="POST" action="?/t3Form" class="w-full max-w-lg" use:enhance>
			<div class="flex flex-row items-center justify-center gap-4">
				{#each t3_menu as option}
					<Label>
						<input type="checkbox" bind:group={$form.options} name="options" value={option} />
						{option}
					</Label>
				{/each}
				{#if $errors.options?._errors}<p>{$errors.options._errors}</p>{/if}
			</div>
			{#if officeMode === true}
				<div class="flex flex-wrap -mx-3 mb-6">
					<div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
						<Label for="oLnpVA"
							>Lighting and Power 40-60VA/m<sup>2</sup>
							<Input type="number" id="oLnpVA" name="oLnpVA" bind:value={$form.oLnpVA} />
						</Label>
					</div>
					<div class="w-full md:w-1/2 px-3">
						<Label>Area m<sup>2</sup></Label>
						<Input type="number" id="oLnpArea" bind:value={$form.oLnpArea} />
					</div>
					<div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
						<Label>AC Cooling 30-40VA/m<sup>2</sup></Label>
						<Input type="number" id="oAccVA" name="oAccVA" bind:value={$form.oAccVA} />
					</div>
					<div class="w-full md:w-1/2 px-3">
						<Label>Area m<sup>2</sup></Label>
						<Input type="number" id="oAccArea" name="oAccArea" bind:value={$form.oAccArea} />
					</div>
					<div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
						<Label>AC Reverse Cycle 20-30VA/m<sup>2</sup></Label>
						<Input type="number" id="oAcrcVA" name="oAcrcVA" bind:value={$form.oAcrcVA} />
					</div>
					<div class="w-full md:w-1/2 px-3">
						<Label>Area m<sup>2</sup></Label>
						<Input type="number" id="oAcrcArea" name="oAcrcArea" bind:value={$form.oAcrcArea} />
					</div>
					<div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
						<Label>AC Zonal Heating 40-40VA/m<sup>2</sup></Label>
						<Input type="number" id="oAczhVA" name="oAczhVA" bind:value={$form.oAczhVA} />
					</div>
					<div class="w-full md:w-1/2 px-3">
						<Label>Area m<sup>2</sup></Label>
						<Input type="number" id="oAczhArea" name="oAczhArea" bind:value={$form.oAczhArea} />
					</div>
					<div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
						<Label>AC Variable Volume 40-40VA/m<sup>2</sup></Label>
						<Input type="number" id="oAcvvVA" name="oAcvvVA" bind:value={$form.oAcvvVA} />
					</div>
					<div class="w-full md:w-1/2 px-3">
						<Label>Area m<sup>2</sup></Label>
						<Input type="number" id="oAcvvArea" name="oAcvvArea" bind:value={$form.oAcvvArea} />
					</div>
					<p>Total Office Load: {officeTotal} VA</p>
				</div>
			{/if}
			{#if carparksMode === true}
				<div class="flex flex-wrap -mx-3 mb-6">
					<div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
						<Label>Open Air</Label>
						<Input type="number" id="cpOaVA" bind:value={$form.cpOaVA} />
					</div>
					<div class="w-full md:w-1/2 px-3">
						<Label>Area m<sup>2</sup></Label>
						<Input type="number" id="cpOaArea" bind:value={$form.cpOaArea} />
					</div>
					<div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
						<Label>Open Air EV Charging</Label>
						<Input type="number" id="cpOaEVCharging" bind:value={$form.cpOaEVCharging} />
					</div>
					<div class="w-full md:w-1/2 px-3">
						<Label>Area m<sup>2</sup></Label>
						<Input type="number" id="cpOaEVChargingArea" bind:value={$form.cpOaEVChargingArea} />
					</div>
					<div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
						<Label>Basement</Label>
						<Input type="number" id="cpBVA" bind:value={$form.cpBVA} />
					</div>
					<div class="w-full md:w-1/2 px-3">
						<Label>Area m<sup>2</sup></Label>
						<Input type="number" id="cpBArea" bind:value={$form.cpBArea} />
					</div>
					<div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
						<Label>Basement EV Charging</Label>
						<Input type="number" id="cpBEVCharging" bind:value={$form.cpBEVCharging} />
					</div>
					<div class="w-full md:w-1/2 px-3">
						<Label>Area m<sup>2</sup></Label>
						<Input type="number" id="cpBEVChargingArea" bind:value={$form.cpBEVChargingArea} />
					</div>
					<p>Total Carpark Load: {carparkTotal}VA</p>
				</div>
			{/if}
			{#if retailMode === true}
				<div class="flex flex-wrap -mx-3 mb-6">
					<div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
						<Label>Lighting and Power 40-60VA/m<sup>2</sup></Label>
						<Input type="number" id="rsLnpVA" bind:value={$form.rsLnpVA} />
					</div>
					<div class="w-full md:w-1/2 px-3">
						<Label>Area m<sup>2</sup></Label>
						<Input type="number" id="rsLnpArea" bind:value={$form.rsLnpArea} />
					</div>
					<div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
						<Label>Airconditioning</Label>
						<Input type="number" id="rsAcVA" bind:value={$form.rsAcVA} />
					</div>
					<div class="w-full md:w-1/2 px-3">
						<Label>Area m<sup>2</sup></Label>
						<Input type="number" id="rsAcArea" bind:value={$form.rsAcArea} />
					</div>
					<p>Total Retail Load: {retailTotal} VA</p>
				</div>
			{/if}
			{#if warehouseMode === true}
				<div class="flex flex-wrap -mx-3 mb-6">
					<div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
						<Label>Lighting and Power 40-60VA/m<sup>2</sup></Label>
						<Input type="number" id="wLnpVA" bind:value={$form.wLnpVA} />
					</div>
					<div class="w-full md:w-1/2 px-3">
						<Label>Area m<sup>2</sup></Label>
						<Input type="number" id="wLnpArea" bind:value={$form.wLnpArea} />
					</div>
					<div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
						<Label>Ventilation</Label>
						<Input type="number" id="wVVA" bind:value={$form.wVVA} />
					</div>
					<div class="w-full md:w-1/2 px-3">
						<Label>Area m<sup>2</sup></Label>
						<Input type="number" id="wVArea" bind:value={$form.wVArea} />
					</div>
					<p>Total Warehouse Load: {warehouseTotal}</p>
				</div>
			{/if}
			{#if lightIndMode === true}
				<div class="flex flex-wrap -mx-3 mb-6">
					<div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
						<Label>Lighting and Power 40-60VA/m<sup>2</sup></Label>
						<Input type="number" id="liLnpVA" bind:value={$form.liLnpVA} />
					</div>
					<div class="w-full md:w-1/2 px-3">
						<Label>Area m<sup>2</sup></Label>
						<Input type="number" id="liLnpArea" bind:value={$form.liLnpArea} />
					</div>
					<div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
						<Label>Ventilation</Label>
						<Input type="number" id="liVVA" bind:value={$form.liVVA} />
					</div>
					<div class="w-full md:w-1/2 px-3">
						<Label>Area m<sup>2</sup></Label>
						<Input type="number" id="liVArea" bind:value={$form.liVArea} />
					</div>
					<p>Total Light Industrial Load: {lightIndTotal} VA</p>
				</div>
			{/if}
			{#if tavernsMode === true}
				<div class="flex flex-wrap -mx-3 mb-6">
					<div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
						<Label>Lighting and Power 40-60VA/m<sup>2</sup></Label>
						<Input type="number" id="tVA" bind:value={$form.tVA} />
					</div>
					<div class="w-full md:w-1/2 px-3">
						<Label>Area m<sup>2</sup></Label>
						<Input type="number" id="tArea" bind:value={$form.tArea} />
					</div>
					<p>Total Taverns,Pubs & Clubs Load: {tavernsTotal} VA</p>
				</div>
			{/if}
			{#if theatresMode === true}
				<div class="flex flex-wrap -mx-3 mb-6">
					<div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
						<Label
							>Lighting and Power 40-60VA/m<sup>2</sup>
							<Input type="number" id="thVA" name="thVA" bind:value={$form.thVA} />
						</Label>
					</div>
					<div class="w-full md:w-1/2 px-3">
						<Label
							>Area m<sup>2</sup>
							<Input type="number" id="thArea" name="thArea" bind:value={$form.thArea} />
						</Label>
					</div>
					<p>Total Theatre Load: {theatresTotal} VA</p>
				</div>
			{/if}

			<!-- {#if data.session.isLoggedIn === true} -->
			<!-- 	<Button>Save Calculation</Button> -->
			<!-- {/if} -->
			<Button>Calculate Max Demand</Button>
			<p>Grand Total : VA</p>
			<!-- <Button>Print out Calculation</Button> -->
		</form>
	{/if}
	{#if tableMode === true}
		<h1 class="text-2xl">Table C2 Non-Domestic Installations</h1>
		<hr />
		<form action="?/t2Form" method="POST" class="w-full max-w-lg" use:enhance>
			<input type="hidden" name="__superform_id" value={$formId} />
			<!-- {#if (session = true)} -->
			<!-- 	<Button>Save Calculation</Button> -->
			<!-- {/if} -->
			<Button>Calculate Max Demand</Button>
			<p>Grand Total : VA</p>
			<!-- <Button>Print out Calculation</Button> -->
		</form>
	{/if}
</div>
