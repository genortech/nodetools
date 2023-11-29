
<script lang="ts">
	import { enhance } from '$app/forms';
	import { Input } from '$lib/components/ui/input';

	import type { PageData } from './$types';

	export let data: PageData;
</script>

<h1>Profile</h1>
<p>User id: {data.userId}</p>
<p>Username: {data.username}</p>
<form method="post" action="?/logout" use:enhance>
	<Input type="submit" value="Sign out" />
</form>
