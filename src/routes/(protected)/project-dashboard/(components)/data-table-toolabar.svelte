<script lang="ts">
	import { DataTableFacetedFilter, DataTableViewOptions } from '.';
	import type { AnyPlugins } from 'svelte-headless-table/lib/types/TablePlugin';
	import type { TableViewModel } from 'svelte-headless-table/lib/createViewModel';
	import { Cross2 } from 'radix-icons-svelte';
	import { statuses, priorities } from '../(data)/data';
	import type { Writable } from 'svelte/store';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import type { Project } from '$lib/config/zod-schema';

	export let tableModel: TableViewModel<Project, AnyPlugins>;

	const { pluginStates } = tableModel;
	const {
		filterValue
	}: {
		filterValue: Writable<string>;
	} = pluginStates.filter;

	const {
		filterValues
	}: {
		filterValues: Writable<{
			status: string[];
			priority: string[];
		}>;
	} = pluginStates.colFilter;

	$: showReset = Object.values($filterValues).some((v) => v.length > 0);
</script>

<div class="flex items-center justify-between">
	<div class="flex flex-1 items-center space-x-2">
		<Input
			placeholder="Filter tasks..."
			class="h-8 w-[150px] lg:w-[250px]"
			type="text"
			bind:value={$filterValue}
		/>

		<DataTableFacetedFilter
			bind:filterValues={$filterValues.status}
			title="Status"
			options={statuses}
		/>
		<DataTableFacetedFilter
			bind:filterValues={$filterValues.priority}
			title="Priority"
			options={priorities}
		/>
		{#if showReset}
			<Button
				on:click={() => {
					$filterValues.status = [];
					$filterValues.priority = [];
				}}
				variant="ghost"
				class="h-8 px-2 lg:px-3"
			>
				Reset
				<Cross2 class="ml-2 h-4 w-4" />
			</Button>
		{/if}
	</div>

	<DataTableViewOptions {tableModel} />
</div>
