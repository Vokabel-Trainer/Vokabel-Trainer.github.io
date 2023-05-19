import { languagePairStore } from './store';

export type Category = {
	title: string;
	values: Record<string, string | Array<string>>;
};

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
		},
		// , {
		// 	from: Language.Russian,
		// 	to: Language.German,
		// 	code: 'ru-de'
		// }
		{
			from: Language.German,
			to: Language.Spain,
			code: 'de-es'
		}
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
		case Language.Spain:
			return 'Spanisch';
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
	Russian,
	Spain
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

export enum LearningType {
	None = 0,
	SelectAnswers = 1,
	EnterAnswers = 2
}

export function getAllLearningTypes() {
	return [LearningType.SelectAnswers, LearningType.EnterAnswers];
}

export function setLearningTypes(learningType: LearningType) {
	localStorage.setItem('learningType', JSON.stringify(learningType));
}

export function getLearningTypes() {
	const learningType = localStorage.getItem('learningType');
	if (!learningType) {
		return LearningType.SelectAnswers;
	}
	return JSON.parse(learningType) as LearningType;
}
