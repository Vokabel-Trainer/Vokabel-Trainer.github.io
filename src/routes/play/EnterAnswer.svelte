<script lang="ts">
	import {
		OutputType,
		getAllOutputTypes,
		getName,
		getOutputTypes,
		getSelectedLanguage
	} from '$lib/languages';
	import { getRandomChoice, hasFlag } from '$lib/methods';
	import { confetti } from '@neoconfetti/svelte';
	import Question from './Question.svelte';
	import { getTranslation } from '$lib/locales/translation';

	export let question: string;
	export let correctAnswers: string[];
	export let playAudio: (text: string) => void;
	export let checkAnswer: (text: string) => boolean;
	export let onAnswer: ((correct: boolean) => Promise<void>) | null = null;

	let correct: boolean | null = null;
	let text: string;

	async function nextClick(e: Event) {
		e.preventDefault();
		if (correct == null) {
			correct = checkAnswer(text);
			return;
		}
		onAnswer && (await onAnswer(correct!));
	}

	const outputType = getOutputTypes();

	let currentOutputType = getRandomChoice(
		getAllOutputTypes().filter((x) => hasFlag(outputType, x))
	);

	const langName = getName(getSelectedLanguage()!.to);
</script>

<div class="flex-1 flex flex-col justify-center items-center">
	<Question {question} {playAudio} answer={correctAnswers[0]} outputType={currentOutputType} />

	<form class="flex flex-col items-center" on:submit={nextClick}>
		<p class="mb-1">
			{getTranslation('enterWordInLang').replace('{lang}', getTranslation(langName))}
		</p>

		<div class="flex flex-row w-full justify-center flex-wrap gap-1">
			<!-- svelte-ignore a11y-autofocus -->
			<input type="text" readonly={correct != null} autofocus bind:value={text} />
		</div>

		<button
			type="submit"
			class={`btn mt-2 w-64 ${correct == null ? '' : correct ? 'btn-success' : 'btn-error'}`}
			>{getTranslation('next')}</button
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
			{getTranslation('correctAnswers')}
			{#if currentOutputType === OutputType.Audio}
				<p>
					{correctAnswers.join(', ')}
				</p>
			{:else}
				{#each correctAnswers as correctAnswer}
					<button class="btn" on:click={() => playAudio(correctAnswer)}>{correctAnswer}</button>
				{/each}
			{/if}
		{/if}

		{#if currentOutputType === OutputType.Audio}
			{getTranslation('translation')} {question}
		{/if}
	{/if}
</div>
