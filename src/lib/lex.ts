import type { Lexer } from 'nearley';

export type TokenType =
	| 'particle'
	| 'content'
	| 'preposition'
	| 'preverb'
	| 'number'
	| 'modifierOnly' // kin, a, and names
	| 'unmarkedSubject'; // mi, sina

export const tokenTypes = [
	'particle',
	'content',
	'preposition',
	'preverb',
	'number',
	'modifierOnly',
	'unmarkedSubject'
] as const satisfies TokenType[];

export type Token = {
	type: TokenType;
	value: string;
	index: number;
};

export const particles = ['li', 'e', 'pi', 'la', 'en', 'o', 'anu'];
export const prepositions = ['tan', 'lon', 'sama', 'tawa', 'kepeken'];
export const preverbs = [
	'awen',
	'kama',
	'wile',
	'ken',
	'sona',
	'lukin',
	'alasa'
];
export const numbers = ['wan', 'tu', 'luka', 'mute', 'ale'];
export const unmarkedSubjects = ['mi', 'sina'];

export class TokiPonaLexer implements Lexer {
	private i = 0;
	private text = '';

	reset(text: string, _info: unknown) {
		this.i = 0;
		this.text = text;
	}

	next() {
		this.skipNonWord();

		if (this.i >= this.text.length) {
			return;
		}

		const index = this.i;

		while (this.i < this.text.length && this.isWord(this.text[this.i])) {
			this.i++;
		}

		const value = this.text.substring(index, this.i);

		let type = 'content';

		if (particles.includes(value)) {
			type = 'particle';
		} else if (prepositions.includes(value)) {
			type = 'preposition';
		} else if (preverbs.includes(value)) {
			type = 'preverb';
		} else if (numbers.includes(value)) {
			type = 'number';
		} else if (
			value === 'kin' ||
			value === 'a' ||
			value[0] === value[0].toUpperCase()
		) {
			type = 'modifierOnly';
		} else if (unmarkedSubjects.includes(value)) {
			type = 'unmarkedSubject';
		}

		return { type, value, index };
	}

	save() {
		return {};
	}

	formatError(token: Token) {
		return `'${token.value}' at index ${token.index}`;
	}

	has(tokenType: string) {
		return tokenTypes.includes(tokenType as TokenType);
	}

	private skipNonWord() {
		while (this.i < this.text.length && !this.isWord(this.text[this.i])) {
			this.i++;
		}
	}

	private isWord(char: string) {
		return /[a-z]/i.test(char);
	}
}
