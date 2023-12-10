<script lang="ts">
	import { fly, slide } from 'svelte/transition';
	import Loading from '$lib/components/Loading.svelte';
	import { getFavoritesContext } from '$lib/stores/favorites.js';
	import { Heading, Label, Input, Card } from 'flowbite-svelte';
	import { adaptCountries, type Country } from '$lib/models/country';

	let countries: Country[] = [];
	let isLoading = false;

	const favorites = getFavoritesContext();

	const fetchCountries = async (name: string): Promise<Country[]> => {
		if (!name) return [];

		isLoading = true;

		try {
			const response = await fetch(`https://restcountries.com/v3.1/name/${name}`);

			if (response.status === 404) return [];

			const countries = await response.json();
			return adaptCountries(countries);
		} catch (error) {
			console.error(error);
			return null;
		}
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		const name = event.target.elements.name.value;
		countries = await fetchCountries(name);
		isLoading = false;
	};
</script>

<Heading tag="h1" class="my-4">search</Heading>

<form class="max-w-xs" on:submit={handleSubmit}>
	<Label for="name" class="mb-2">search countries:</Label>
	<Input id="name" size="lg" name="name" autocomplete="country-name" required />
</form>

{#if isLoading}
	<div class="max-w-xs">
		<Loading />
	</div>
{:else}
	{#if !countries.length}
		<div class="my-4" in:fly={{ y: 20 }} out:slide>
			<Heading tag="h2">no results... :(</Heading>
		</div>
	{/if}

	{#key countries}
		<ul in:fly={{ y: 20 }} out:slide class="flex flex-col gap-4 my-8">
			{#each countries as country}
				<Card size="xs" padding="md" on:click={() => favorites.toggle(country)}>
					<div class="flex items-center gap-4">
						<Heading tag="h6">{country.name}</Heading>
					</div>
				</Card>
			{/each}
		</ul>
	{/key}

	{#if !countries}
		<div class="my-4" in:fly={{ y: 20 }} out:slide>
			<Heading tag="h2">Error fetching countries. Please try again later.</Heading>
		</div>
	{/if}
{/if}
