<script>
	import '../app.pcss';
</script>

<head>
	<title>NodeTools Software</title>
</head>
<body class="flex justify-between w-full flex-col min-h-screen">
	<header class="flex flex-row items-center justify-between px-12 py-4">
		<a class="text-xl text-slate-800 font-extrabold" href="/"
			><img src="/logo/logo.png" alt="Logo" width="64" height="64" /></a
		>
		<div class="flex flex-row gap-x-4 items-center">
			<a href="/contact" class="font-light text-slate-600 hover:underline">Contact</a>
			<a href="/about" class="font-light text-slate-600 hover:underline">About</a>
			<a href="/login" class="font-light text-slate-600 hover:underline">login</a>
		</div>
	</header>
	<slot />
	<footer class="flex items-center justify-center py-4">
		<a
			class="text-slate-400 font-light hover:underline"
			href="https://nodegroup.com.au"
			target="_blank"
			>Company of Node Group Pty Ltd &copy;
		</a>
	</footer>
</body>
