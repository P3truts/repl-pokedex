import { cleanInput } from "./repl.js";
import { describe, expect, test } from "vitest";

describe.each([
	{
		input: "  hello     world  ",
		expected: ["hello", "world"],
	},
	{
		input: "			he l  lll  o   , worl d				",
		expected: ["he", "l", "lll", "o", ",", "worl", "d"],
	},
	{
		input: " hi, duuude     w h a t is   thaaaa  aaaa aat     ",
		expected: ["hi,", "duuude", "w", "h", "a", "t", "is", "thaaaa", "aaaa", "aat"],
	}
])("cleanInput($input)", ({ input, expected }) => {
	test(`Expected: ${expected}`, () => {
		const actual: string[] = cleanInput(input);

		expect(actual).toHaveLength(expected.length);
		for (const i in expected) {
			expect(actual[i]).toBe(expected[i]);
		}
	});
});
