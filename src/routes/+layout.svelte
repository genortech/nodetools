<script lang="ts">
	import '../app.pcss';
	import { page } from '$app/stores';
	import { ModeWatcher } from 'mode-watcher';
	import { getFlash } from 'sveltekit-flash-message';
	import Navigation from '$lib/components/navigation/navigation.svelte';

	export let data: any;
	let user: Lucia.UserAttributes;
	$: user = data.user;
	const flash = getFlash(page);
	$: console.log('+layout.svelte root flash: ' + $flash);
	/*$: if ($flash) {
		switch ($flash.type) {
			case 'success':
				toast($flash.message, {
					position: 'bottom-right',
					duration: 5000,
					style: 'background: #000; color: #fff;'
				});
				break;
			case 'error':
				toast.error($flash.message);
				break;
		}
	}*/
</script>

<head>
	<title>NodeTools Software</title>
</head>
<ModeWatcher />
<body class="flex justify-between w-full flex-col min-h-screen">
	<header class="flex flex-row items-center justify-between px-12 py-4">
		<Navigation {user} />
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
