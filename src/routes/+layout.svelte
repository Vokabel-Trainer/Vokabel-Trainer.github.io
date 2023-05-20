<script lang="ts">
	import { getName } from '$lib/languages';
	import { languagePairStore } from '$lib/store';
	import '../app.css';
</script>

<main class="p-1 flex h-full w-full flex-col">
	{#if $languagePairStore}
		<p class="font-bold">
			Ausgewählte Sprache: {getName($languagePairStore.from)} - {getName($languagePairStore.to)}
		</p>
	{/if}
	<slot />
</main>
