<script lang="ts">
	import { getAllVocables, saveVocable, type Vocable } from '$lib/db';
	import { randomIntInRange, shuffleArray } from '$lib/methods';
	import SelectionQueston from './SelectionQueston.svelte';

	let vocables = new Array<Vocable>();
	let vocable: Vocable | null = null;

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

	async function handleAnswer(correct: boolean) {
		vocables = vocables.filter((x) => x !== vocable);
		if (correct) {
			vocable!.failed = 0;
			vocable!.success++;
		} else {
			vocable!.failed++;
			vocable!.success = 0;
		}

		await saveVocable(vocable!);

		const elementCount = vocables.length;
		let index = 0;

		if (vocable!.failed > 3) {
			index = randomIntInRange(3, 5);
		} else if (vocable!.failed > 0) {
			index = randomIntInRange(5, 8);
		} else if (vocable!.success > 10) {
			index = elementCount;
		} else if (vocable!.success > 5) {
			index = randomIntInRange(30, 50);
		} else if (vocable!.success > 3) {
			index = randomIntInRange(10, 30);
		} else {
			index = randomIntInRange(5, 10);
		}

		vocables.splice(Math.min(index, elementCount), 0, vocable!);
		vocable = vocables[0];
	}
</script>

<svelte:head>
	<title>Vokabeln lernen</title>
	<meta name="description" content="Vokabeln lernen." />
</svelte:head>

{#if vocable != null}
	<SelectionQueston
		question={vocable.lang1}
		correctAnswers={makeArray(vocable)}
		possibleAnswers={shuffleArray([makeArray(vocable)[0], ...getSomeAnswers()])}
		onAnswer={handleAnswer}
	/>
{/if}
