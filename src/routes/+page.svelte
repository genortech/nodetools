<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { APP_NAME } from '$lib/config/constants';
	import type { PageData } from './$types';

	let maxdevModuleStatus = false;
	let cablepullModuleStatus = false;
	let earthingModuleStatus = false;
	let vdModuleStatus = false;
	export let data: PageData;
</script>

<main class="w-full grow flex items-center justify-center">
	<div class="flex flex-col items-center justify-center gap-4">
		<!-- <div class="flex flex-col items-center justify-center gap-4"> -->
		<!-- 	<img src="/logo/logo.png" alt="" width="256" height="256" /> -->
		<!-- </div> -->
		<div class="flex flex-row items-center justify-center gap-4">
			<h1 class="text-6xl font-bold">
				Welcome to <span
					class="bg-gradient-to-r from-red-600 via-orange-500 to-purple-400 text-transparent bg-clip-text"
					>{APP_NAME}</span
				>
			</h1>
		</div>
		<div class="flex flex-row items-center justify-center gap-4">
			<div class="flex flex-col items-center justify-center gap-4">
				<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
					<Card.Root>
						<Card.Header>
							<Card.Title>Earthing Calculations</Card.Title>
						</Card.Header>
						<Card.Content>
							{#if earthingModuleStatus == true}
								<p>Try it out <a href="/earthing" class="text-green-700">here</a></p>
							{/if}
							<p>Coming Soon</p>
						</Card.Content>
					</Card.Root>
					<Card.Root>
						<Card.Header>
							<Card.Title>Maximum Demand Calculations</Card.Title>
						</Card.Header>
						<Card.Content>
							{#if maxdevModuleStatus == true}
								<p>Try it out <a href="/max-demand" class="text-red-700">here</a></p>
							{/if}
							<p>Coming Soon</p>
						</Card.Content>
					</Card.Root>
					<Card.Root>
						<Card.Header>
							<Card.Title>Voltage Drop Calculations</Card.Title>
						</Card.Header>
						<Card.Content>
							{#if vdModuleStatus == true}
								<p>Try it out <a href="/voltage-drop" class="text-blue-700">here</a></p>
							{/if}
							<p>Coming Soon</p>
						</Card.Content>
					</Card.Root>
					<Card.Root>
						<Card.Header>
							<Card.Title>Cable Pull Calculations</Card.Title>
						</Card.Header>
						<Card.Content>
							{#if cablepullModuleStatus == true}
								<p>Try it out <a href="/cable-pull" class="text-orange-700">here</a></p>
							{/if}
							<p>Coming Soon</p>
						</Card.Content>
					</Card.Root>
				</div>
			</div>
		</div>
	</div>
</main>
