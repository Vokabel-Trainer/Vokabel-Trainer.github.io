import { writable } from 'svelte/store';
import type { LanguagePair } from './languages';

export const languagePairStore = writable<LanguagePair | null>(null);
export const anyCategoriesSelectedStore = writable<boolean>(false);
