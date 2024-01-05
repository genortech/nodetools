<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Download } from 'lucide-svelte';
	// import DataTable from './(components)/data-table.svelte';
	console.log('Loading Project Dashboard');
	export let data;
</script>

<div class="flex-1 space-y-4 p-8 pt-6">
	<div class="flex items-center justify-between space-y-2">
		<h2 class="text-3xl font-bold tracking-tight">Dashboard</h2>
		<div class="flex items-center space-x-2">
			<Button size="sm">
				<Download class="mr-2 h-4 w-4" />
				Download
			</Button>
		</div>
	</div>
	<div class="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
		<div class="flex items-center justify-between space-y-2">
			<div>
				<h2 class="text-2xl font-bold tracking-tight">Welcome back!</h2>
				<p class="text-muted-foreground">Here's a list of your projects</p>
			</div>
			<div class="flex items-center space-x-2"></div>
		</div>
		<!-- <DataTable {data} /> -->
	</div>

	<div class="p-4 flex flex-col justify-between h-full">
		<div class="h-1/10 w-full flex items-center flex-row justify-end">
			<a
				href="/project"
				cla
				ess="bg-green-300 px-3 py-1 rounded-full hover:bg-green-400 hover:cursor text-white"
				>New Project</a
			>
		</div>
		<div class="max-h-9/10">
			{#each data.user_projects as project}
				<div
					class="flex flex-row justify-between items-center gap-y-2 border-b border-slate-200 p-4"
				>
					<div>
						<span class="font-bold text-lg text-slate-900">{project.id}</span> -
						<span class="font-bold text-lg text-slate-900">{project.prjctRef}</span> -
						<span class="font-light text-lg text-slate-700">{project.prjctClient}</span>
					</div>
					<div>
						<Button
							class="bg-orange-500 text-white font-bold text-lg px-3 py-2 "
							href="/project/{project.id}">Edit</Button
						>
						<Button class="bg-red-500 text-white font-bold text-lg px-3 py-2 ">Delete</Button>
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>
