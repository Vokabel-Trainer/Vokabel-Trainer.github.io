import { openDB } from 'idb';
import type { DBSchema } from 'idb/build/entry';
import type { Category } from './languages';
import { anyCategoriesSelectedStore } from './store';

export type Vocable = {
	lang1: string;
	lang2: string | Array<string>;
	category: string;
	level: number;
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
	return await openDB<LanguageDb>('Language', 3, {
		upgrade(database, _oldVersion, _newVersion, _transaction, _event) {
			if (_oldVersion < 1) {
				database.createObjectStore('vocables');
				database.createObjectStore('categories', { keyPath: 'title' });
			} else if (_oldVersion < 3) {
				_transaction
					.objectStore('vocables')
					.getAll()
					.then((vocables) =>
						vocables.forEach((vocable) => {
							_transaction.objectStore('vocables').put(
								{
									lang1: vocable.lang1,
									lang2: vocable.lang2,
									category: vocable.category,
									level: 0
								},
								vocable.lang1
							);
						})
					);
			}
		}
	});
}

export async function storeFile(categories: Array<Category>, visibleCategories: Array<string>) {
	const db = await initDb();
	const transaction = db.transaction(['vocables', 'categories'], 'readwrite');

	const vocablestore = transaction.objectStore('vocables');
	vocablestore.clear();
	const categoriesStore = transaction.objectStore('categories');
	categoriesStore.clear();

	for (const category of categories) {
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
					level: 0
				},
				vocable
			);
		}
	}
	transaction.commit();
	db.close();
	anyCategoriesSelectedStore.set(visibleCategories.length > 0);
}

export async function getSelectedCategories() {
	const db = await initDb();
	const transaction = db.transaction('categories', 'readonly');
	return (await transaction.store.getAll()).filter((x) => x.visible).map((x) => x.title);
}

export async function anyCategoriesSelected() {
	return (await getSelectedCategories()).length > 0;
}

export async function getAllVocables() {
	const db = await initDb();
	const transaction = db.transaction(['vocables', 'categories'], 'readonly');
	const categories = await (await transaction.objectStore('categories').getAll())
		.filter((x) => x.visible)
		.map((x) => x.title);
	return (await transaction.objectStore('vocables').getAll())
		.filter((x) => categories.includes(x.category))
		.sort((x, y) => x.level - y.level);
}

export async function saveVocable(vocable: Vocable) {
	const db = await initDb();
	const transaction = db.transaction('vocables', 'readwrite');
	await transaction.store.put(vocable, vocable.lang1);
}
