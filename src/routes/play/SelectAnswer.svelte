<script lang="ts">
	import { confetti } from '@neoconfetti/svelte';

	export let question: string;
	export let playAudio: (text: string) => void;
	export let checkAnswer: (text: string) => boolean;
	export let possibleAnswers: string[];
	export let correctAnswers: string[];
	export let onAnswer: ((correct: boolean) => Promise<void>) | null = null;

	let correct: boolean | null = null;
	let selectedAnswer: string | null = null;

	$: {
		correct = null;
		// Refresh when temp changes.
		const temp = question;
	}

	async function nextPage() {
		if (correct == null) {
			correct = checkAnswer(selectedAnswer!);
			return;
		}

		onAnswer && (await onAnswer(correct!));
	}

	function selectAnswer(answer: string) {
		if (correct == null) {
			selectedAnswer = answer;
		}
		playAudio(answer);
	}

	function getButtonClass(answer: string, selectedAnswer: string | null, correct: boolean | null) {
		if (correct == null) {
			return selectedAnswer === answer ? 'btn-warning' : '';
		}
		if (correctAnswers.includes(answer)) {
			return 'btn-success';
		}
		if (!correct) {
			return selectedAnswer === answer ? 'btn-error' : '';
		}
	}
</script>

<div class="flex-1 flex flex-col justify-center items-center">
	<p class="text-center mb-1 font-bold">{question}</p>

	<div class="flex flex-row w-full justify-center flex-wrap gap-1">
		{#each possibleAnswers as answer}
			<button
				class={`btn ${getButtonClass(answer, selectedAnswer, correct)}`}
				on:click={() => selectAnswer(answer)}>{answer}</button
			>
		{/each}
	</div>

	<button
		class={`btn mt-2 w-64 ${correct == null ? '' : correct ? 'btn-success' : 'btn-error'}`}
		on:click={nextPage}
		disabled={selectedAnswer == null}>Weiter</button
	>
	{#if correct}
		<div
			class="overflow-hidden"
			style="position: absolute; left: 50%; top: 30%"
			use:confetti={{
				particleCount: 50,
				force: 0.7,
				stageWidth: window.innerWidth / 2,
				stageHeight: window.innerHeight / 2,
				colors: ['#ff3e00', '#40b3ff', '#676778']
			}}
		/>
	{/if}
</div>
