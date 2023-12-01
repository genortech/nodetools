<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';

	export let data;
</script>

<h1>New Project</h1>
<div>
	<div>
		<a href="/project-dashboard">Dashboard</a>
	</div>
	<div>
		<form method="POST">
			<Label for="project_reference">Project Reference</Label>
			<Input name="project_reference" id="project_reference" /><br />
			<Label for="client_name">Client Name</Label>
			<Input name="client_name" id="client_name" /><br />
			<Button type="submit">Create Project</Button>
		</form>
	</div>
</div>
