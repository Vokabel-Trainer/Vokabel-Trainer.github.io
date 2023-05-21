<script lang="ts">
	import { OutputType } from '$lib/languages';
	import { getTranslation } from '$lib/locales/translation';
	import { applicationLanguageStore } from '$lib/store';

	export let answer: string;
	export let question: string;
	export let outputType: OutputType;

	export let playAudio: (text: string) => void;

	function playAnswer() {
		playAudio(answer);
	}

	$: {
		if (outputType === OutputType.Audio) {
			playAnswer();
		}
	}
</script>

{#if outputType === OutputType.Text}
	<p class="text-center mb-1 font-bold">{question}</p>
{:else if outputType === OutputType.Audio}
	<button class="btn mb-1" on:click={playAnswer}>{getTranslation("replayAudio", $applicationLanguageStore)}</button>
{/if}
