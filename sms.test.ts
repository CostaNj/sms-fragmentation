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

	it('text with changed fragments exponent 9 -> 10', () => {
		const result = getFragments(`${text} ${text} ${text}`);
		expect(result).toEqual([
			"Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Ut enim ad 1/10",
			"minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat Duis aute irure dolor in reprehenderit 2/10",
			"in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui 3/10",
			"officia deserunt mollit anim id est laborum Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut 4/10",
			"labore et dolore magna aliqua Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo 5/10",
			"consequat Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint 6/10",
			"occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum Lorem ipsum dolor sit amet consectetur 7/10",
			"adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Ut enim ad minim veniam quis nostrud exercitation 8/10",
			"ullamco laboris nisi ut aliquip ex ea commodo consequat Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore 9/10",
			"eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum 10/10"
		]);
		expect(result.map(fragment => fragment.length).filter((value) => value > maxFragmentSize)).toEqual([]);
	});

});