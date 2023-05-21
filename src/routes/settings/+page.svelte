<script lang="ts">
	import { browser } from '$app/environment';
	import {
		InputType,
		Language,
		OutputType,
		getInputTypes,
		getOutputTypes,
		getSelectedApplicationLanguage,
		setInputTypes,
		setOutputTypes,
		setSelectLanguage,
		setSelectedApplicationLanguage
	} from '$lib/languages';
	import { getTranslation } from '$lib/locales/translation';
	import { addFlag, hasFlag, removeFlag } from '$lib/methods';

	let inputTypes = InputType.None;
	let outputTypes = OutputType.None;
	let selectedLanguage: Language = Language.None;

	$: {
		if (browser) {
			inputTypes = getInputTypes();
			outputTypes = getOutputTypes();
			selectedLanguage = getSelectedApplicationLanguage();
		}
	}

	function handleInputChange(inputType: InputType) {
		if (hasFlag(inputTypes, inputType)) {
			inputTypes = removeFlag(inputTypes, inputType);
		} else {
			inputTypes = addFlag(inputTypes, inputType);
		}
		setInputTypes(inputTypes);
	}

	function handleOutputChange(outputType: OutputType) {
		if (hasFlag(outputTypes, outputType)) {
			outputTypes = removeFlag(outputTypes, outputType);
		} else {
			outputTypes = addFlag(outputTypes, outputType);
		}
		setOutputTypes(outputTypes);
	}

	function handleLanguageChange() {
		setSelectedApplicationLanguage(selectedLanguage);
	}
</script>

<svelte:head>
	<title>{getTranslation('settings')}</title>
	<meta name="description" content="Einstellungen zum Lernen der Vokabeln." />
</svelte:head>

<div class="flex flex-row w-full justify-center flex-wrap overflow-auto gap-1">
	<div class="card w-64 bg-base-100 shadow-xl">
		<div class="card-body">
			<div class="card-title">{getTranslation('typeofOutput')}</div>

			<div class="flex flex-col">
				<div class="flex">
					<p>{getTranslation('text')}</p>
					<input
						type="checkbox"
						checked={hasFlag(outputTypes, OutputType.Text)}
						on:change={() => handleOutputChange(OutputType.Text)}
					/>
				</div>

				<div class="flex">
					<p>{getTranslation('audio')}</p>
					<input
						type="checkbox"
						checked={hasFlag(outputTypes, OutputType.Audio)}
						on:change={() => handleOutputChange(OutputType.Audio)}
					/>
				</div>
			</div>
		</div>

		<div class="card-body">
			<div class="card-title">{getTranslation('typeofInput')}</div>

			<div class="flex flex-col">
				<div class="flex">
					<p>{getTranslation('selectAnswers')}</p>
					<input
						type="checkbox"
						checked={hasFlag(inputTypes, InputType.SelectAnswers)}
						on:change={() => handleInputChange(InputType.SelectAnswers)}
					/>
				</div>

				<div class="flex">
					<p>{getTranslation('enterAnswers')}</p>
					<input
						type="checkbox"
						checked={hasFlag(inputTypes, InputType.EnterAnswers)}
						on:change={() => handleInputChange(InputType.EnterAnswers)}
					/>
				</div>
			</div>
		</div>

		<div class="card-body">
			<div class="card-title">{getTranslation('language')}</div>

			<div class="flex flex-col">
				<div class="flex items-center">
					<p>{getTranslation('language')}</p>

					<select
						class="select"
						bind:value={selectedLanguage}
						on:change={() => handleLanguageChange()}
					>
						<option value={Language.English}>{getTranslation('english')}</option>
						<option value={Language.German}>{getTranslation('german')}</option>
					</select>
				</div>
			</div>
		</div>
	</div>
</div>
