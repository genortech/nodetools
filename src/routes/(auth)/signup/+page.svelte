<!-- routes/signup/+page.svelte -->
<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
</script>

<h1>Sign up</h1>
<form method="post" use:enhance>
	<Label for="username">Username</Label>
	<Input name="username" id="username" /><br />
	<Label for="password">Password</Label>
	<Input type="password" name="password" id="password" /><br />
	<Button type="submit">Sign Up</Button>
</form>
<a href="/login">Sign in</a>
