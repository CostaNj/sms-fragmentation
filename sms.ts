export const getFragments = (text: string): string[] => {
	const smsLength = 140;

	if(text.length <= smsLength) {
		return [text];
	}

	const words = text.split(" ");
	const maxFragmentLength = words.length > 9999 ? 9999 : words.length;

	const fragments = words.reduce<string[]>((acc, currentValue) => {
		if(acc.length === 0) {
			acc.push(currentValue);
			return acc;
		}

		const suffix = `${acc.length}/${maxFragmentLength}`;
		const currentFragment = acc[acc.length - 1];
		const potentialIncreasedFragment = `${currentFragment} ${currentValue} ${suffix}`;

		if(potentialIncreasedFragment.length <= smsLength) {
			acc[acc.length - 1] = `${currentFragment} ${currentValue}`;
		} else {
			acc.push(currentValue);
		}

		return acc;
	}, [])

	return fragments.map((fragment, index, acc) => `${fragment} ${index + 1}/${acc.length}`);
}
