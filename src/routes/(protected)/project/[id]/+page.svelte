<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	console.log('Loading Project Page');
	export let data;
</script>

<div>
	<h1>{data.project[0].id}</h1>
	<h1>{data.project[0].prjctRef}</h1>
	<h1>{data.project[0].prjctClient}</h1>
	<div>
		<Button class="bg-orange-500 text-white font-bold text-lg px-3 py-2 ">Edit</Button>
		<Button class="bg-red-500 text-white font-bold text-lg px-3 py-2 ">Delete</Button>
	</div>
</div>
