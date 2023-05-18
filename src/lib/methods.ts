export function shuffleArray<T>(array: Array<T>) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
}

export function randomIntInRange(min: number, max: number) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}
