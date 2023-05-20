export function shuffleArray<T>(array: Array<T>) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
}

export function getRandomNumberInRange(min: number, max: number) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

export function getRandomChoice<T>(elements: Array<T>) {
	return elements[getRandomNumberInRange(0, elements.length - 1)];
}

export function hasFlag(value: number, flag: number): boolean {
	return (value & flag) !== 0;
}

export function removeFlag(value: number, flag: number): number {
	return value & ~flag;
}

export function addFlag(value: number, flag: number): number {
	return value | flag;
}
