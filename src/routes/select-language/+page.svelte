<script lang="ts">
	import { goto } from '$app/navigation';
	import {
		getLanguages,
		getName,
		setSelectLanguage as selectLanguageBase,
		type LanguagePair
	} from '../../lib/languages';

	const languages = getLanguages();

	function selectLanguage(language: LanguagePair) {
		selectLanguageBase(language);
		goto('/select-categories');
	}
</script>

<svelte:head>
	<title>Sprachen auswählen</title>
	<meta name="description" content="Wählen Sie die Sprache für die Vokabeln aus." />
</svelte:head>

<h1 class="font-bold">Vokabeltrainer</h1>

<div class="flex flex-row w-full justify-center flex-wrap overflow-auto gap-1">
	{#each languages as language}
		<div class="card w-96 bg-base-100 shadow-xl">
			<div class="card-body">
				<div class="card-title">{getName(language.from)} - {getName(language.to)}</div>
				<p>Vokabeln von {getName(language.from)} nach {getName(language.to)} lernen.</p>
				<div class="card-actions justify-end">
					<button class="btn btn-primary" on:click={() => selectLanguage(language)}
						>Auswählen</button
					>
				</div>
			</div>
		</div>
	{/each}
</div>
