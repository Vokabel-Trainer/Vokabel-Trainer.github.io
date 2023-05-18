import { writable } from 'svelte/store';
import type { LanguagePair } from './languages';

export const languagePairStore = writable<LanguagePair | null>(null);
