<script lang="ts">
	import { confetti } from '@neoconfetti/svelte';

	export let question: string;
	export let correctAnswers: string[];
	export let playAudio: (text: string) => void;
	export let checkAnswer: (text: string) => boolean;
	export let onAnswer: ((correct: boolean) => Promise<void>) | null = null;

	let correct: boolean | null = null;
	let text: string;

	$: {
		correct = null;
		// Refresh when temp changes.
		const temp = question;
	}

	async function nextClick(e: Event) {
		e.preventDefault();
		if (correct == null) {
			correct = checkAnswer(text);
			return;
		}
		onAnswer && (await onAnswer(correct!));
	}
</script>

<div class="flex-1 flex flex-col justify-center items-center">
	<p class="text-center mb-1 font-bold">{question}</p>

	<form on:submit={nextClick}>
		<div class="flex flex-row w-full justify-center flex-wrap gap-1">
			<!-- svelte-ignore a11y-autofocus -->
			<input type="text" readonly={correct != null} autofocus bind:value={text} />
		</div>

		<button
			type="submit"
			class={`btn mt-2 w-64 ${correct == null ? '' : correct ? 'btn-success' : 'btn-error'}`}
			>Weiter</button
		>
	</form>

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
		{:else}
			Richtige Antworten:
			{#each correctAnswers as correctAnswer}
				<button class="btn" on:click={() => playAudio(correctAnswer)}>{correctAnswer}</button>
			{/each}
		{/if}
	{/if}
</div>