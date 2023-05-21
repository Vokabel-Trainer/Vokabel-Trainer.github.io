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
		{
			from: Language.German,
			to: Language.Russian,
			code: 'de-ru'
		},
		{
			from: Language.German,
			to: Language.Spain,
			code: 'de-es'
		},
		{
			from: Language.English,
			to: Language.German,
			code: 'en-de'
		},
		{
			from: Language.English,
			to: Language.Russian,
			code: 'en-ru'
		},
		{
			from: Language.English,
			to: Language.Spain,
			code: 'en-es'
		},
		{
			from: Language.Russian,
			to: Language.German,
			code: 'ru-de'
		},
		{
			from: Language.Russian,
			to: Language.English,
			code: 'ru-en'
		},
		{
			from: Language.Russian,
			to: Language.Spain,
			code: 'ru-es'
		}
	];
}

export function getName(language: Language) {
	switch (language) {
		case Language.None:
			throw new Error("No language doesn't have a name.");
		case Language.German:
			return 'german';
		case Language.English:
			return 'english';
		case Language.Russian:
			return 'russian';
		case Language.Spain:
			return 'spain';
	}
}

export type LanguagePair = {
	from: Language;
	to: Language;
	code: string;
};

export enum Language {
	None = 0,
	English = 1,
	German = 2,
	Russian = 3,
	Spain = 4
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

export enum InputType {
	None = 0,
	SelectAnswers = 1,
	EnterAnswers = 2
}

export function getAllInputTypes() {
	return [InputType.SelectAnswers, InputType.EnterAnswers];
}

export function setInputTypes(inputType: InputType) {
	localStorage.setItem('inputType', JSON.stringify(inputType));
}

export function getInputTypes() {
	const inputType = localStorage.getItem('inputType');
	if (!inputType) {
		return InputType.SelectAnswers;
	}
	return JSON.parse(inputType) as InputType;
}

export enum OutputType {
	None = 0,
	Text = 1,
	Audio = 2
}

export function getAllOutputTypes() {
	return [OutputType.Text, OutputType.Audio];
}

export function setOutputTypes(inputType: OutputType) {
	localStorage.setItem('outputType', JSON.stringify(inputType));
}

export function getOutputTypes() {
	const inputType = localStorage.getItem('outputType');
	if (!inputType) {
		return OutputType.Text | OutputType.Audio;
	}
	return JSON.parse(inputType) as OutputType;
}

export function setSelectedApplicationLanguage(language: Language) {
	localStorage.setItem('applicationLanguage', JSON.stringify(language));
}

export function getSelectedApplicationLanguage() {
	const language = localStorage.getItem('applicationLanguage');
	if (!language) {
		if (navigator.language.toLocaleLowerCase().includes('de')) {
			return Language.German;
		}
		return Language.English;
	}
	return JSON.parse(language) as Language;
}
