<script lang="ts">
	import { confetti } from '@neoconfetti/svelte';

	export let question: string;
	export let checkAnswer: (text: string) => boolean;
	export let possibleAnswers: string[];
	export let correctAnswers: string[];
	export let onAnswer: ((correct: boolean) => Promise<void>) | null = null;

	let correct: boolean | null = null;

	$: {
		correct = null;
		// Refresh when temp changes.
		const temp = question;
	}

	async function nextPage() {
		onAnswer && (await onAnswer(correct!));
	}
</script>

<div class="flex-1 flex flex-col justify-center items-center">
	<p class="text-center mb-1 font-bold">{question}</p>

	<div class="flex flex-row w-full justify-center flex-wrap gap-1">
		{#each possibleAnswers as answer}
			<button
				class={`btn ${correct != null && correctAnswers.includes(answer) ? 'btn-success' : ''}`}
				on:click={() => (correct = checkAnswer(answer))}>{answer}</button
			>
		{/each}
	</div>

	{#if correct != null}
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

		<button class={`btn mt-2 w-64 ${correct ? 'btn-success' : 'btn-error'}`} on:click={nextPage}
			>Weiter</button
		>
	{/if}
</div>
