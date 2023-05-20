<script lang="ts">
	import { getAllVocables, saveVocable, type Vocable } from '$lib/db';
	import { getAllInputTypes, getInputTypes, getSelectedLanguage, InputType } from '$lib/languages';
	import { getRandomChoice, getRandomNumberInRange, hasFlag, shuffleArray } from '$lib/methods';
	import EnterAnswer from './EnterAnswer.svelte';
	import SelectAnswer from './SelectAnswer.svelte';

	let vocables = new Array<Vocable>();
	let vocable: Vocable | null = null;
	let inputType: InputType = getInputTypes();

	getAllVocables().then((x) => {
		vocables = x;
		vocable = x[0];
	});

	function makeArray(vocable: Vocable) {
		if (vocable.lang2 instanceof Array<string>) {
			return vocable.lang2;
		}
		return [vocable.lang2];
	}

	function getSomeAnswers() {
		const possibleAnswers = makeArray(vocable!);
		return vocables
			.slice(1, 5)
			.flatMap((x) => makeArray(x))
			.filter((x) => !possibleAnswers.includes(x))
			.slice(0, 5);
	}

	function stopAudioIfIsPlaying() {
		if ('speechSynthesis' in window && window.speechSynthesis.speaking) {
			window.speechSynthesis.cancel();
		}
	}

	function playAudio(text: string) {
		if ('speechSynthesis' in window) {
			stopAudioIfIsPlaying();

			const speechSynthesisUtterance = new SpeechSynthesisUtterance(text);
			speechSynthesisUtterance.lang = getSelectedLanguage()!.code.split('-')[1];

			window.speechSynthesis.speak(speechSynthesisUtterance);
		}
	}

	function checkAnswer(text: string) {
		const success = makeArray(vocable!).some(
			(x) => x.toLocaleLowerCase() === text.toLocaleLowerCase()
		);
		new Audio(success ? '/success.mp3' : '/wrong.mp3').play();
		return success;
	}

	async function handleAnswer(correct: boolean) {
		stopAudioIfIsPlaying();
		vocables = vocables.filter((x) => x !== vocable);
		vocable!.level += correct ? 1 : -1;

		await saveVocable(vocable!);

		const minPosition = vocables.findIndex((x) => x.level >= vocable!.level);
		const maxPosition = vocables.findLastIndex((x) => x.level < vocable!.level) + 1;
		const nextIndex = getRandomNumberInRange(
			Math.max(minPosition, 1),
			maxPosition === -1 ? vocables.length : maxPosition
		);

		vocables.splice(nextIndex, 0, vocable!);
		vocable = vocables[0];
	}

	let currentInputType = InputType.None;
	$: {
		// Rerun when the vocable changes
		const temp = vocable;

		const inputTypes = getAllInputTypes().filter((x) => hasFlag(inputType, x));
		currentInputType = getRandomChoice(inputTypes);
	}
</script>

<svelte:head>
	<title>Vokabeln lernen</title>
	<meta name="description" content="Vokabeln lernen." />
</svelte:head>

{#if vocable != null}
	{#key vocable}
		{#if currentInputType === InputType.SelectAnswers}
			<SelectAnswer
				question={vocable.lang1}
				{checkAnswer}
				{playAudio}
				correctAnswers={makeArray(vocable)}
				possibleAnswers={shuffleArray([makeArray(vocable)[0], ...getSomeAnswers()])}
				onAnswer={handleAnswer}
			/>
		{:else if currentInputType === InputType.EnterAnswers}
			<EnterAnswer
				question={vocable.lang1}
				checkAnswer={(text) => {
					const correct = checkAnswer(text);
					if (correct) {
						playAudio(text);
					}
					return correct;
				}}
				{playAudio}
				correctAnswers={makeArray(vocable)}
				onAnswer={handleAnswer}
			/>
		{/if}
	{/key}
{/if}
