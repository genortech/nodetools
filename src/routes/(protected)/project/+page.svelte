<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
</script>

<div class="flex-1 space-y-4 p-8 pt-6">
	<div class="flex items-center justify-between space-y-2">
		<h2 class="text-3xl font-bold tracking-tight">New Project</h2>
	</div>
	<!-- <div> -->
	<!-- 	<a href="/project-dashboard">Go Back to Dashboard</a> -->
	<!-- </div> -->
	<div>
		<form method="POST" action="?/newproject">
			<Label for="project_reference">Project Reference</Label>
			<Input name="project_reference" id="project_reference" /><br />
			<Label for="project_location">Project Location</Label>
			<Input name="project_location" id="project_location" /><br />
			<Label for="client_name">Client Name</Label>
			<Input name="client_name" id="client_name" /><br />
			<Button type="submit">Create Project</Button>
			<Button href="/project-dashboard">Cancel</Button>
		</form>
	</div>
</div>
