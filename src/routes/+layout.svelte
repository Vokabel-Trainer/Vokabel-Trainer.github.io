<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { anyCategoriesSelected } from '$lib/db';
	import { getName, getSelectedLanguage } from '$lib/languages';
	import { anyCategoriesSelectedStore, languagePairStore } from '$lib/store';
	import '../app.css';

	$: {
		if (browser) {
			languagePairStore.set(getSelectedLanguage());
			anyCategoriesSelected().then(anyCategoriesSelectedStore.set);
		}
	}

	$: showBackButton = browser && $page.route.id !== '/';

	function handleBackClick() {
		window.history.back();
	}
</script>

<main class="p-1 flex h-full w-full flex-col">
	{#if browser}
		{#if $languagePairStore}
			<div class="flex mx-1 mt-1">
				<p class="font-bold flex-1">
					Ausgewählte Sprache: {getName($languagePairStore.from)} - {getName($languagePairStore.to)}
				</p>
				<button
					class={`btn btn-sm btn-circle ${showBackButton ? '' : 'hidden'}`}
					on:click={handleBackClick}>X</button
				>
			</div>
		{:else}
			<div class="flex mx-1 mt-1">
				<p class="font-bold flex-1">Aktuell ist keine Sprache ausgewählt.</p>
				<button
					class={`btn btn-sm btn-circle ${showBackButton ? '' : 'hidden'}`}
					on:click={handleBackClick}>X</button
				>
			</div>
		{/if}
	{:else}
		<p class="font-bold">Ausgewählte Sprachen werden geladen.</p>
	{/if}
	<slot />
</main>
