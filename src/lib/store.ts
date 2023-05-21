import { writable } from 'svelte/store';
import type { Language, LanguagePair } from './languages';

export const languagePairStore = writable<LanguagePair | null>(null);
export const anyCategoriesSelectedStore = writable<boolean>(false);
export const applicationLanguageStore = writable<Language | null>(null);
