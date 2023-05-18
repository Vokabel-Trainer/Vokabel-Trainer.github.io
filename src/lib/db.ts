import { openDB } from 'idb';
import type { DBSchema } from 'idb/build/entry';
import type { File } from './languageFile';

export type Vocable = {
	lang1: string;
	lang2: string | Array<string>;
	category: string;
	success: number;
	failed: number;
};

interface LanguageDb extends DBSchema {
	vocables: {
		key: string;

		value: Vocable;
	};
	categories: {
		key: string;

		value: {
			title: string;
			visible: boolean;
		};
	};
}

export async function initDb() {
	return await openDB<LanguageDb>('Language', 1, {
		upgrade(database, _oldVersion, _newVersion, _transaction, _event) {
			if (_oldVersion < 1) {
				database.createObjectStore('vocables');
				database.createObjectStore('categories', { keyPath: 'title' });
			}
		}
	});
}

export async function storeFile(file: File, visibleCategories: Array<string>) {
	const db = await initDb();
	const transaction = db.transaction(['vocables', 'categories'], 'readwrite');

	const vocablestore = transaction.objectStore('vocables');
	vocablestore.clear();
	const categoriesStore = transaction.objectStore('categories');
	categoriesStore.clear();

	for (const category of file.categories) {
		await categoriesStore.put({
			title: category.title,
			visible: visibleCategories.includes(category.title)
		});
		for (const vocable of Object.keys(category.values)) {
			await vocablestore.put(
				{
					lang1: vocable,
					lang2: category.values[vocable],
					category: category.title,
					success: 0,
					failed: 0
				},
				vocable
			);
		}
	}
	transaction.commit();
	db.close();
}

export async function anyCategoriesSelected() {
	const db = await initDb();
	const transaction = db.transaction('categories', 'readonly');
	return (await transaction.store.getAllKeys()).length > 0;
}

export async function getAllVocables() {
	const db = await initDb();
	const transaction = db.transaction(['vocables', 'categories'], 'readonly');
	const categories = await (await transaction.objectStore('categories').getAll())
		.filter((x) => x.visible)
		.map((x) => x.title);
	return (await transaction.objectStore('vocables').getAll())
		.filter((x) => categories.includes(x.category))
		.sort((x, y) => (y.failed - x.failed !== 0 ? y.failed - x.failed : x.success - y.success));
}

export async function saveVocable(vocable: Vocable) {
	const db = await initDb();
	const transaction = db.transaction('vocables', 'readwrite');
	await transaction.store.put(vocable, vocable.lang1);
}
