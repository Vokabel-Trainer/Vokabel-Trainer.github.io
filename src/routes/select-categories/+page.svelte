<script lang="ts">
	import { goto } from '$app/navigation';
	import { getSelectedCategories, storeFile } from '$lib/db';
	import type { Category } from '$lib/languages';
	import { languagePairStore } from '$lib/store';

	function getWords(category: Category): Array<string> {
		return Object.keys(category.values);
	}

	let categories = new Array<Category>();
	let checkedCategories = new Array<string>();

	$: {
		if ($languagePairStore != null) {
			fetch(`${$languagePairStore!.code}.json`)
				.then((x) => x.text().then((y) => JSON.parse(y) as Array<Category>))
				.then((file) => (categories = file));
		}
	}

	$: {
		getSelectedCategories().then((selectedCategories) =>
			categories.some(
				(category) =>
					(checkedCategories = selectedCategories.includes(category.title)
						? selectedCategories
						: categories.map((x) => x.title))
			)
		);
	}

	function handleChange(category: Category) {
		if (checkedCategories.includes(category.title)) {
			checkedCategories = [...checkedCategories.filter((x) => x !== category.title)];
		} else {
			checkedCategories = [...checkedCategories, category.title];
		}
	}

	async function handleNextClick() {
		await storeFile(categories!, checkedCategories);
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
						checked={checkedCategories.includes(category.title)}
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
