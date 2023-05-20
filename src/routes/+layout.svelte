<script lang="ts">
	import { browser } from '$app/environment';
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
</script>

<main class="p-1 flex h-full w-full flex-col">
	{#if browser}
		{#if $languagePairStore}
			<p class="font-bold">
				Ausgewählte Sprache: {getName($languagePairStore.from)} - {getName($languagePairStore.to)}
			</p>
		{/if}
	{:else}
		<p class="font-bold">Ausgewählte Sprachen werden geladen.</p>
	{/if}
	<slot />
</main>
