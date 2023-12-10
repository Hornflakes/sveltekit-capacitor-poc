<script lang="ts">
	import { getFavoritesContext } from '$lib/stores/favorites';
	import { fly } from 'svelte/transition';
	import { Card, Heading } from 'flowbite-svelte';

	const favorites = getFavoritesContext();
</script>

<Heading tag="h1" class="my-4">favorites</Heading>

<ul in:fly={{ y: 20 }} class="flex flex-col gap-4 my-8">
	{#each Object.values($favorites) as country}
		<Card size="xs" padding="md" on:click={() => favorites.toggle(country)}>
			<div class="flex items-center gap-4">
				<Heading tag="h6">{country.name}</Heading>
			</div>
		</Card>
	{/each}
</ul>
