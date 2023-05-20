<script lang="ts">
	import { browser } from '$app/environment';
	import {
		InputType,
		OutputType,
		getInputTypes,
		getOutputTypes,
		setInputTypes,
		setOutputTypes
	} from '$lib/languages';
	import { addFlag, hasFlag, removeFlag } from '$lib/methods';

	let inputTypes = InputType.None;
	let outputTypes = OutputType.None;

	$: {
		if (browser) {
			inputTypes = getInputTypes();
			outputTypes = getOutputTypes();
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
</script>

<svelte:head>
	<title>Einstellungen</title>
	<meta name="description" content="Einstellungen zum Lernen der Vokabeln." />
</svelte:head>

<div class="flex flex-row w-full justify-center flex-wrap overflow-auto gap-1">
	<div class="card w-64 bg-base-100 shadow-xl">
		<div class="card-body">
			<div class="card-title">Arten der Ausgabe</div>

			<div class="flex flex-col">
				<div class="flex">
					<p>Text</p>
					<input
						type="checkbox"
						checked={hasFlag(outputTypes, OutputType.Text)}
						on:change={() => handleOutputChange(OutputType.Text)}
					/>
				</div>

				<div class="flex">
					<p>Audio</p>
					<input
						type="checkbox"
						checked={hasFlag(outputTypes, OutputType.Audio)}
						on:change={() => handleOutputChange(OutputType.Audio)}
					/>
				</div>
			</div>
		</div>

		<div class="card-body">
			<div class="card-title">Arten der Eingabe</div>

			<div class="flex flex-col">
				<div class="flex">
					<p>Antworten auswählen</p>
					<input
						type="checkbox"
						checked={hasFlag(inputTypes, InputType.SelectAnswers)}
						on:change={() => handleInputChange(InputType.SelectAnswers)}
					/>
				</div>

				<div class="flex">
					<p>Antwort eingeben</p>
					<input
						type="checkbox"
						checked={hasFlag(inputTypes, InputType.EnterAnswers)}
						on:change={() => handleInputChange(InputType.EnterAnswers)}
					/>
				</div>
			</div>
		</div>
	</div>
</div>
