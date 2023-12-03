<!-- routes/login/+page.svelte -->
<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { superForm } from 'sveltekit-superforms/client';
	import type { PageData } from './$types';
	export let data: PageData;
	const { form, enhance, errors, constraints } = superForm(data.signinForm, { resetForm: false });
</script>

<h1>Sign in</h1>
<form method="POST" use:enhance>
	<Label for="email">Email</Label>
	<Input
		type="email"
		name="email"
		id="email"
		bind:value={$form.email}
		aria-invalid={$errors.email ? 'true' : undefined}
		{...$constraints.email}
	/><br />
	<Label for="password">Password</Label>
	<Input
		type="password"
		name="password"
		id="password"
		bind:value={$form.password}
		aria-invalid={$errors.password ? 'true' : undefined}
		{...$constraints.password}
	/><br />
	<Button type="submit">Submit</Button>
</form>
<a href="/signup">Create an account</a>
