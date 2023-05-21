<script lang="ts">
	import { goto } from '$app/navigation';
	import { getTranslation } from '$lib/locales/translation';
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
	<title>{getTranslation('selectLanguage')}</title>
	<meta name="description" content="Wählen Sie die Sprache für die Vokabeln aus." />
</svelte:head>

<div class="flex flex-row w-full justify-center flex-wrap overflow-auto gap-1">
	{#each languages as language}
		<div class="card w-96 bg-base-100 shadow-xl">
			<div class="card-body">
				<div class="card-title">
					{getTranslation(getName(language.from))} - {getTranslation(getName(language.to))}
				</div>
				<p>
					{getTranslation('learnVocablesFromTo')
						.replace('{from}', getTranslation(getName(language.from)))
						.replace('{to}', getTranslation(getName(language.to)))}
				</p>
				<div class="card-actions justify-end">
					<button class="btn btn-primary" on:click={() => selectLanguage(language)}
						>{getTranslation('select')}</button
					>
				</div>
			</div>
		</div>
	{/each}
</div>
