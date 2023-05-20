<script lang="ts">
	import { anyCategoriesSelectedStore, languagePairStore } from '$lib/store';

	$: langSelected = $languagePairStore != null;
</script>

<svelte:head>
	<title>Startseite</title>
	<meta name="description" content="Startseite zum Lernen von Vokabeln." />
</svelte:head>

<div class="flex-1 flex justify-center items-center flex-wrap gap-1 flex-col sm:flex-row">
	<a class={`btn ${langSelected && $anyCategoriesSelectedStore ? '' : 'btn-disabled'}`} href="/play"
		>Starten</a
	>
	<a class="btn" href="/select-language">Sprache ändern</a>
	<a class={`btn ${langSelected ? '' : 'btn-disabled'}`} href="/select-categories"
		>Kategorien auswählen</a
	>
	<a class="btn" href="/settings">Einstellungen</a>
	<a class="btn" href="/aboutus">Über uns</a>
</div>
