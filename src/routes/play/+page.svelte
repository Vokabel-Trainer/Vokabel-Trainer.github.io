<script lang="ts">
	import { getAllVocables, saveVocable, type Vocable } from '$lib/db';
	import {
		getAllLearningTypes,
		getLearningTypes,
		getSelectedLanguage,
		LearningType
	} from '$lib/languages';
	import { hasFlag, randomIntInRange, shuffleArray } from '$lib/methods';
	import EnterAnswer from './EnterAnswer.svelte';
	import SelectAnswer from './SelectAnswer.svelte';

	let vocables = new Array<Vocable>();
	let vocable: Vocable | null = null;
	let learningType: LearningType = getLearningTypes();

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

	function playAudio(text: string){
		if ('speechSynthesis' in window) {
			if (window.speechSynthesis.speaking) {
				window.speechSynthesis.cancel();
			}

			const speechSynthesisUtterance = new SpeechSynthesisUtterance(text);
			speechSynthesisUtterance.lang = getSelectedLanguage()!.code.split('-')[1];

			window.speechSynthesis.speak(speechSynthesisUtterance);
		}
	}

	function checkAnswer(text: string) {
		return makeArray(vocable!).some((x) => x.toLocaleLowerCase() === text.toLocaleLowerCase());
	}

	async function handleAnswer(correct: boolean) {
		vocables = vocables.filter((x) => x !== vocable);
		vocable!.level += correct ? 1 : -1;

		await saveVocable(vocable!);

		const minPosition = vocables.findIndex((x) => x.level >= vocable!.level);
		const maxPosition = vocables.findLastIndex((x) => x.level < vocable!.level) + 1;
		const nextIndex = randomIntInRange(
			Math.max(minPosition, 1),
			maxPosition === -1 ? vocables.length : maxPosition
		);

		vocables.splice(nextIndex, 0, vocable!);
		vocable = vocables[0];
	}

	let currentLearningType = LearningType.None;
	$: {
		// Rerun when the vocable changes
		const temp = vocable;

		const learningTypes = getAllLearningTypes().filter((x) => hasFlag(learningType, x));
		currentLearningType = learningTypes[randomIntInRange(0, learningTypes.length - 1)];
	}
</script>

<svelte:head>
	<title>Vokabeln lernen</title>
	<meta name="description" content="Vokabeln lernen." />
</svelte:head>

{#if vocable != null}
	{#key vocable}
		{#if currentLearningType === LearningType.SelectAnswers}
			<SelectAnswer
				question={vocable.lang1}
				{checkAnswer}
				playAudio={playAudio}
				correctAnswers={makeArray(vocable)}
				possibleAnswers={shuffleArray([makeArray(vocable)[0], ...getSomeAnswers()])}
				onAnswer={handleAnswer}
			/>
		{:else if currentLearningType === LearningType.EnterAnswers}
			<EnterAnswer
				question={vocable.lang1}
				checkAnswer={(text) => {
					playAudio(text);
					return checkAnswer(text);
				}}
				correctAnswers={makeArray(vocable)}
				onAnswer={handleAnswer}
			/>
		{/if}
	{/key}
{/if}
