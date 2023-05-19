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
