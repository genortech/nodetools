<!-- routes/login/+page.svelte -->
<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { superForm } from 'sveltekit-superforms/client';
	import type { PageData } from './$types';
	export let data: PageData;
	const { form, enhance, errors, constraints } = superForm(data.signinForm, { resetForm: false });
</script>

<Card.Root class="w-[400px]">
	<Card.Header>
		<Card.Title>Example Sign In</Card.Title>
		<Card.Description>Showcasing how to use the sign in in SvelteKit with Lucia</Card.Description>
	</Card.Header>
	<Card.Content>
		<form class="flex flex-col gap-y-4" method="POST">
			<div class="flex flex-col w-full gap-1.5">
				<Label for="email">email</Label>
				<Input type="email" id="email" placeholder="email" name="email" required />
			</div>

			<div class="flex flex-col w-full gap-1.5">
				<Label for="password">password</Label>
				<Input type="password" id="password" placeholder="password" name="password" required />
			</div>

			{#if form?.message}
				<span class="text-sm font-light text-red-600">{form?.message}</span>
			{/if}

			<div class="flex flex-row justify-center items-center w-full gap-1.5">
				<Button type="submit" class="bg-blue-800 dark:text-white hover:text-black">
					<Mail class="mr-2 h-4 w-4" />
					Sign In with Email
				</Button>
			</div>
		</form>
	</Card.Content>
	<Card.Footer class="w-full flex items-center justify-center">
		<Button variant="link" href="/auth/signup">sign up</Button>
	</Card.Footer>
</Card.Root>

<!-- <h1>Sign in</h1> -->
<!-- <form method="POST" use:enhance> -->
<!-- 	<Label for="email">Email</Label> -->
<!-- 	<Input -->
<!-- 		type="email" -->
<!-- 		name="email" -->
<!-- 		id="email" -->
<!-- 		bind:value={$form.email} -->
<!-- 		aria-invalid={$errors.email ? 'true' : undefined} -->
<!-- 		{...$constraints.email} -->
<!-- 	/><br /> -->
<!-- 	<Label for="password">Password</Label> -->
<!-- 	<Input -->
<!-- 		type="password" -->
<!-- 		name="password" -->
<!-- 		id="password" -->
<!-- 		bind:value={$form.password} -->
<!-- 		aria-invalid={$errors.password ? 'true' : undefined} -->
<!-- 		{...$constraints.password} -->
<!-- 	/><br /> -->
<!-- 	<Button type="submit">Submit</Button> -->
<!-- </form> -->
<!-- <a href="/signup">Create an account</a> -->
