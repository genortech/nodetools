<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	console.log('Loading Project Page');
	export let data;
</script>

<div>
	<h1>Project Reference: {data.project[0].prjctRef}</h1>
	<h1>Project Location: {data.project[0].prjctLocation}</h1>
	<h1>Client Name: {data.project[0].prjctClient}</h1>
	<div>
		<Button class="bg-orange-500 text-white font-bold text-lg px-3 py-2 ">Edit</Button>
		<Button class="bg-red-500 text-white font-bold text-lg px-3 py-2 ">Delete</Button>
	</div>

	<div>
		<Button class="bg-blue-500 text-white font-bold  px-3 py-2 ">VD Calculation</Button>
		<Button class="bg-orange-500 text-white font-bold  px-3 py-2 ">MD Calculation</Button>
		<Button class="bg-green-500 text-white font-bold  px-3 py-2 ">Earthing Calculation</Button>
		<Button class="bg-purple-500 text-white font-bold px-3 py-2 ">Cable Pull Calculation</Button>
	</div>

	<section>
		<div>
			<h1>Voltage Drop Calculations</h1>
			<!-- 	<div> -->
			<!-- 		{#each vdcalcs as vd}{/each} -->
			<!-- 	</div> -->
		</div>
		<div>
			<h1>Maximum Demand Calculations</h1>
			<!-- <div> -->
			<!-- 	{#each mdcalcs as md}{/each} -->
			<!-- </div> -->
		</div>
		<div>
			<h1>Earthing Calculations</h1>
			<!-- <div> -->
			<!-- 	{#each mdcalcs as md}{/each} -->
			<!-- </div> -->
		</div>
		<div>
			<h1>Cable Pulling Calculations</h1>
			<!-- <div> -->
			<!-- 	{#each cblplcalcs as cblpl}{/each} -->
			<!-- </div> -->
		</div>
	</section>
</div>
