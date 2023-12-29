<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import * as Card from '$lib/components/ui/card';
	import * as Alert from '$lib/components/ui/alert';
	import type { SuperValidated } from 'sveltekit-superforms';
	import { Loader2 } from 'lucide-svelte';
	import { AlertCircle } from 'lucide-svelte';
	import { userSchema } from '$lib/config/zod-schema';
	import CardDescription from '$lib/components/ui/card/card-description.svelte';
	import { Label } from '$lib/components/ui/label';

	const signUpSchema = userSchema.pick({
		email: true,
		password: true
	});

	type SignUpSchema = typeof signUpSchema;

	export let form: SuperValidated<SignUpSchema>;
</script>

<div class="flex items-center justify-center mx-auto max-w-2xl">
	<Form.Root let:submitting let:errors method="POST" {form} schema={signUpSchema} let:config>
		<Card.Root>
			<Card.Header class="space-y-1">
				<Card.Title class="text-2xl">Create an account</Card.Title>
				<Card.Description
					>Already have an account? <a href="/auth/sign-in" class="underline">Sign in here.</a
					></Card.Description
				>
			</Card.Header>
			<Card.Content class="grid gap-4">
				{#if errors?._errors?.length}
					<Alert.Root variant="destructive">
						<AlertCircle class="h-4 w-4" />
						<Alert.Title>Error</Alert.Title>
						<Alert.Description>
							{#each errors._errors as error}
								{error}
							{/each}
						</Alert.Description>
					</Alert.Root>
				{/if}
				<Form.Field {config} name="email">
					<Form.Item>
						<Form.Label>Email</Form.Label>
						<Form.Input />
						<Form.Validation />
					</Form.Item>
				</Form.Field>
				<Form.Field {config} name="password">
					<Form.Item>
						<Form.Label>Password</Form.Label>
						<Form.Input type="password" />
						<Form.Validation />
					</Form.Item>
				</Form.Field>
				<Card.Content class="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
					<div class="space-y-1 leading-none">
						<Card.Title>By Signing Up</Card.Title>
						<Card.Description>
							You agree to <a href="/terms" class="text-primaryHover underline">terms</a> and
							<a href="/privacy" class="text-primaryHover underline">privacy policy</a>.
						</Card.Description>
					</div>
				</Card.Content>
			</Card.Content>
			<Card.Footer>
				<Form.Button class="w-full" disabled={submitting}
					>{#if submitting}
						<Loader2 class="mr-2 h-4 w-4 animate-spin" />
						Please wait{:else}Sign Up{/if}
				</Form.Button>
			</Card.Footer>
		</Card.Root>
	</Form.Root>
</div>
