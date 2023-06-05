import { getFragments } from './sms'

describe('test sms method', () => {
	const text = 'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum';
	const text140 = 'Lore ipsu Lore ipsu Lore ipsu Lore ipsu Lore ipsu Lore ipsu Lore ipsu Lore ipsu Lore ipsu Lore ipsu Lore ipsu Lore ipsu Lore ipsu Lore ipsun';
	const maxFragmentSize = 140;
	it('small text with - 1 fragment', () => {
		const simpleText = 'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod';
		expect(getFragments(simpleText)).toEqual([simpleText]);
	});

	it('simple text', () => {
		const result = getFragments(text);
		expect(result).toEqual([
			"Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Ut enim ad 1/4",
			"minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat Duis aute irure dolor in reprehenderit 2/4",
			"in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia 3/4",
			"deserunt mollit anim id est laborum 4/4"
		]);
		expect(result.map(fragment => fragment.length).filter((value) => value > maxFragmentSize)).toEqual([]);
	});

	it('huge text (check fragments > 140 letters)', () => {
		const result = getFragments(`${text} ${text} ${text} ${text} ${text} ${text} ${text} ${text} ${text} ${text}`);
		expect(result.map(fragment => fragment.length).filter((value) => value > maxFragmentSize)).toEqual([]);
	});

	it('text with 140 length', () => {
		const result = getFragments(text140);
		expect(result).toEqual([text140]);
	});

	it('text with 140 + n length', () => {
		const result = getFragments(`${text140} test`);
		expect(result).toEqual([text140.replace('ipsun', '1/2'), 'ipsun test 2/2']);
	});
});