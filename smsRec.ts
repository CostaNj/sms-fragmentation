const smsLength = 140;

const getNextFragment = (words: string[], fragmentsLvl: number): { maxFragmentsLvl: number, fragments: string[]} => {

	if(words.length === 0) {
		return {
			maxFragmentsLvl: fragmentsLvl - 1,
			fragments: []
		}
	}

	let currentFragment = '';
	while(`${currentFragment.trim()} ${fragmentsLvl}/`.length <= smsLength && words.length !== 0 ) {
		const word = words.shift();
		currentFragment = `${currentFragment} ${word}`.trim();
	}

	const { maxFragmentsLvl, fragments } = getNextFragment(words, fragmentsLvl + 1)

	const suffix = `${fragmentsLvl}/${maxFragmentsLvl}`;

	const currentFragmentWithSuffix = `${currentFragment} ${suffix}`;
	if(currentFragmentWithSuffix.length <= smsLength) {
		return {
			maxFragmentsLvl,
			fragments: [`${currentFragment} ${suffix}`, ...fragments]
		}
	} else {
		let overLimitedWords: string[] = [];
		const optimalFragments = [currentFragmentWithSuffix, ...fragments].reduce<string[]>((acc, current) => {

			const currentWords = current.split(' ');
			const currentSuffix = currentWords.pop();
			if(overLimitedWords.length !== 0) {
				currentWords.unshift(...overLimitedWords);
				overLimitedWords.length = 0;
			}

			while(`${currentWords.join(' ')} ${currentSuffix}`.length > smsLength) {
				const lastDeletedWord = currentWords.pop();
				if(lastDeletedWord) {
					overLimitedWords.unshift(lastDeletedWord);
				}
			}

			acc.push(`${currentWords.join(' ')} ${currentSuffix}`);

			return acc;
		}, [])

		return {
			maxFragmentsLvl,
			fragments: optimalFragments
		}
	}

}

export const getFragments = (text: string) => {

	if(text.length <= smsLength) {
		return [text];
	}

	const words = text.split(' ');

	const { fragments } = getNextFragment(words, 1);

	return fragments;
}