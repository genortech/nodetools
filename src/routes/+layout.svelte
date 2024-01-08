<script lang="ts">
	import '../app.pcss';
	import { ModeWatcher } from 'mode-watcher';
	export let data;
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Sun, Moon } from 'lucide-svelte';

	import { setMode, resetMode } from 'mode-watcher';
	import { Button } from '$lib/components/ui/button';
</script>

<head>
	<title>NodeTools Software</title>
</head>
<ModeWatcher />
<body class="flex justify-between w-full flex-col min-h-screen">
	<header class="flex flex-row items-center justify-between px-12 py-4">
		<a class="text-2xl font-extrabold" href="/">
			NodeTools
			<!-- <img src="/logo/logo.png" alt="Logo" width="64" height="64" /> -->
		</a>
		<div class="flex flex-row gap-x-4 items-center">
			<a href="/contact" class="font-light hover:underline">Contact</a>
			<a href="/about" class="font-light hover:underline">About</a>
			{#if data.session}
				<a href="/signout" class="font-light hover:underline">Sign Out</a>
			{:else}
				<a href="/signin" class="font-light hover:underline">Sign In</a>
			{/if}
			<DropdownMenu.Root>
				<DropdownMenu.Trigger asChild let:builder>
					<Button builders={[builder]} variant="outline" size="icon">
						<Sun
							class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
						/>
						<Moon
							class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
						/>
						<span class="sr-only">Toggle theme</span>
					</Button>
				</DropdownMenu.Trigger>
				<DropdownMenu.Content align="end">
					<DropdownMenu.Item on:click={() => setMode('light')}>Light</DropdownMenu.Item>
					<DropdownMenu.Item on:click={() => setMode('dark')}>Dark</DropdownMenu.Item>
					<DropdownMenu.Item on:click={() => resetMode()}>System</DropdownMenu.Item>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</div>
	</header>
	<slot />
	<footer class="flex items-center justify-center py-4">
		<div class="flex items-center px-2">
			<a class=" font-light hover:underline" href="/support">FAQ and Support</a>
		</div>
		<div class="flex items-center px-2">
			<a class=" font-light hover:underline" href="https://nodegroup.com.au" target="_blank"
				>Company of Node Group Pty Ltd &copy;
			</a>
		</div>
	</footer>
</body>
