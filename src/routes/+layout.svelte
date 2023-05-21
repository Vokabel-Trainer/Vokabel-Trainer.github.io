<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { anyCategoriesSelected } from '$lib/db';
	import { getName, getSelectedLanguage } from '$lib/languages';
	import { getTranslation } from '$lib/locales/translation';
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
	<div class="flex mx-1 mt-1">
		{#if browser}
			{#if $languagePairStore}
				<p class="font-bold flex-1">
					{getTranslation('selectedLanguage')
						.replace('{from}', getTranslation(getName($languagePairStore.from)))
						.replace('{to}', getTranslation(getName($languagePairStore.to)))}
				</p>
				<button
					class={`btn btn-sm btn-circle ${showBackButton ? '' : 'hidden'}`}
					on:click={handleBackClick}>X</button
				>
			{:else}
				<p class="font-bold flex-1">{getTranslation('noLanguageSelected')}</p>
				<button
					class={`btn btn-sm btn-circle ${showBackButton ? '' : 'hidden'}`}
					on:click={handleBackClick}>X</button
				>
			{/if}
		{:else}
			<p class="font-bold">{getTranslation('loadSelectedLanguage')}</p>
		{/if}
	</div>
	<slot />
</main>
