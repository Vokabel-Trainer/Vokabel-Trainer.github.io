import de from './de.json';
import en from './en.json';

type Translation = {
	// Start screen
	play: string;
	changeLanguage: string;
	selectCategory: string;
	settings: string;
	aboutUs: string;

	// Settings
	typeofOutput: string;
	text: string;
	audio: string;
	typeofInput: string;
	selectAnswers: string;
	enterAnswers: string;

	// Select language
	selectLanguage: string;
	select: string;
	learnVocablesFromTo: string;

	// Select category
	next: string;
	containedWords: string;

	// Play
	learnVocables: string;
	enterWordInLang: string;
	correctAnswers: string;
	translation: string;
	replayAudio: string;

	// Language
	language: string;
	german: string;
	english: string;
	russian: string;
	spain: string;

	// Layout
	loadSelectedLanguage: string;
	noLanguageSelected: string;
	selectedLanguage: string;
};

export function getTranslation(key: keyof Translation): string {
	return en[key];
}
