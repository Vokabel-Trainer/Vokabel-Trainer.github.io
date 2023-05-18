import { languagePairStore } from './store';

export function getLanguages(): Array<LanguagePair> {
	return [
		{
			from: Language.German,
			to: Language.English,
			code: 'de-en'
		},
		// {
		// 	from: Language.English,
		// 	to: Language.German,
		// 	code: 'en-de'
		// },
		{
			from: Language.German,
			to: Language.Russian,
			code: 'de-ru'
		}
		// , {
		// 	from: Language.Russian,
		// 	to: Language.German,
		// 	code: 'ru-de'
		// }
	];
}

export function getName(language: Language) {
	switch (language) {
		case Language.German:
			return 'Deutsch';
		case Language.English:
			return 'Englisch';
		case Language.Russian:
			return 'Russisch';
	}
}

export type LanguagePair = {
	from: Language;
	to: Language;
	code: string;
};

export enum Language {
	German,
	English,
	Russian
}

export function setSelectLanguage(language: LanguagePair) {
	localStorage.setItem('language', JSON.stringify(language));
	languagePairStore.set(language);
}

export function getSelectedLanguage() {
	const selectLanguage = localStorage.getItem('language');
	if (!selectLanguage) {
		return null;
	}
	return JSON.parse(selectLanguage) as LanguagePair;
}
