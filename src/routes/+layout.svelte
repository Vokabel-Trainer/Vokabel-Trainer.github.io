<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { anyCategoriesSelected } from '$lib/db';
	import { getName, getSelectedLanguage } from '$lib/languages';
	import { languagePairStore } from '$lib/store';
	import '../app.css';

	if (browser) {
		const selectedLanguage = getSelectedLanguage();
		if (selectedLanguage != null) {
			languagePairStore.set(selectedLanguage);

			anyCategoriesSelected().then((result) => {
				if (!result) {
					goto('/select-categories');
				}
			});
		} else {
			goto('/select-language');
		}
	}
</script>

<main class="p-1 flex h-full w-full flex-col">
	{#if $languagePairStore}
		<p class="font-bold">
			Ausgewählte Sprache: {getName($languagePairStore.from)} - {getName($languagePairStore.to)}
		</p>
	{/if}
	<slot />
</main>
