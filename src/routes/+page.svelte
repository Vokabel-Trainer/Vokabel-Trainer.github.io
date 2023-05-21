<script lang="ts">
	import { getTranslation } from '$lib/locales/translation';
	import {
		anyCategoriesSelectedStore,
		applicationLanguageStore,
		languagePairStore
	} from '$lib/store';

	$: langSelected = $languagePairStore != null;
</script>

<svelte:head>
	<title>Startseite</title>
	<meta name="description" content="Startseite zum Lernen von Vokabeln." />
</svelte:head>

<div class="flex-1 flex justify-center items-center flex-wrap gap-1 flex-col sm:flex-row">
	<a class={`btn ${langSelected && $anyCategoriesSelectedStore ? '' : 'btn-disabled'}`} href="/play"
		>{getTranslation('play', $applicationLanguageStore)}</a
	>
	<a class="btn" href="/select-language"
		>{getTranslation('changeLanguage', $applicationLanguageStore)}</a
	>
	<a class={`btn ${langSelected ? '' : 'btn-disabled'}`} href="/select-categories"
		>{getTranslation('selectCategory', $applicationLanguageStore)}</a
	>
	<a class="btn" href="/settings">{getTranslation('settings', $applicationLanguageStore)}</a>
	<a class="btn" href="/aboutus">{getTranslation('aboutUs', $applicationLanguageStore)}</a>
</div>
