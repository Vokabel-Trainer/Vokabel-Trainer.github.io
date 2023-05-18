<script lang="ts">
	import { goto } from '$app/navigation';
	import { storeFile } from '$lib/db';
	import type { Category } from '$lib/languages';
	import { languagePairStore } from '$lib/store';

	function getWords(category: Category): Array<string> {
		return Object.keys(category.values);
	}

	let categories = new Array<Category>();

	$: {
		fetch(`${$languagePairStore!.code}.json`)
			.then((x) => x.text().then((y) => JSON.parse(y) as Array<Category>))
			.then((file) => (categories = file));
	}

	$: categories = categories ?? new Array<Category>();

	$: checkedCategories = [...categories];

	function handleChange(category: Category) {
		if (checkedCategories.includes(category)) {
			checkedCategories = [...checkedCategories.filter((x) => x !== category)];
		} else {
			checkedCategories = [...checkedCategories, category];
		}
	}

	function handleNextClick() {
		const selectedCategories = checkedCategories!.map((x) => x.title);
		storeFile(categories!, selectedCategories);
		goto('/');
	}
</script>

<div class="flex flex-row w-full justify-center flex-wrap overflow-auto gap-1">
	{#each categories as category}
		<div class="card w-96 bg-base-100 shadow-xl">
			<div class="card-body">
				<div class="card-title">
					<input
						type="checkbox"
						checked={checkedCategories.includes(category)}
						on:change={() => handleChange(category)}
						class="checkbox"
					/>
					{category.title}
				</div>

				<div class="collapse collapse-arrow bg-base-100 p-1">
					<input type="checkbox" />
					<div class="collapse-title text-xl font-medium">Enthaltene Wörter:</div>
					<div class="collapse-content">
						{getWords(category).join(', ')}
					</div>
				</div>
			</div>
		</div>
	{/each}
</div>

<button
	class="btn w-32 self-center"
	on:click={handleNextClick}
	disabled={checkedCategories.length === 0}>Weiter</button
>
