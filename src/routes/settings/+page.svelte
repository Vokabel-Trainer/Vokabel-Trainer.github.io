<script lang="ts">
	import { browser } from '$app/environment';
	import { LearningType, getLearningTypes, setLearningTypes } from '$lib/languages';
	import { addFlag, hasFlag, removeFlag } from '$lib/methods';

	let learningTypes = LearningType.None;

	$: {
		if (browser) {
			learningTypes = getLearningTypes();
		}
	}

	function handleChange(learningType: LearningType) {
		if (hasFlag(learningTypes, learningType)) {
			learningTypes = removeFlag(learningTypes, learningType);
		} else {
			learningTypes = addFlag(learningTypes, learningType);
		}
		setLearningTypes(learningTypes);
	}
</script>

<svelte:head>
	<title>Einstellungen</title>
	<meta name="description" content="Einstellungen zum Lernen der Vokabeln." />
</svelte:head>

<div class="flex flex-row w-full justify-center flex-wrap overflow-auto gap-1">
	<div class="card w-64 bg-base-100 shadow-xl">
		<div class="card-body">
			<div class="card-title">Arten der Aufgaben</div>

			<div class="flex flex-col">
				<div class="flex">
					<p>Antworten auswählen</p>
					<input
						type="checkbox"
						checked={hasFlag(learningTypes, LearningType.SelectAnswers)}
						on:change={() => handleChange(LearningType.SelectAnswers)}
					/>
				</div>

				<div class="flex">
					<p>Antwort eingeben</p>
					<input
						type="checkbox"
						checked={hasFlag(learningTypes, LearningType.EnterAnswers)}
						on:change={() => handleChange(LearningType.EnterAnswers)}
					/>
				</div>
			</div>
		</div>
	</div>
</div>
