import nearley from 'nearley';

import grammar from './grammar';
import type { Token } from './lex';
import type { Node, Phrase, Predicate, Result, Sentence } from './types';

export type ScoredResult = { result: Result; score: number };

export function parse(text: string) {
	const parser = new nearley.Parser(
		nearley.Grammar.fromCompiled(grammar)
	).feed(text);

	const results = sortResults(addPolarQuestions(parser.results as Result[]));

	return results;
}

function addPolarQuestions(results: Result[]): Result[] {
	const newResults: Result[] = [];

	for (const result of results) {
		newResults.push(result);

		if (result.type !== 'sentence') continue;

		const clause = result.clause;

		const polarPredicates = clause.predicates
			.map((predicate, i) => {
				if (isPossiblyPolarPredicate(predicate)) {
					return i;
				}

				return -1;
			})
			.filter(i => i !== -1);

		if (polarPredicates.length === 0) {
			continue;
		}

		// generate new results for all 2 ^ n - 1 combinations of polar questions

		for (let i = 1; i < 2 ** polarPredicates.length; i++) {
			const newResult: Sentence = {
				...result,
				clause: {
					...clause,
					predicates: clause.predicates.map((predicate, j) => {
						const index = polarPredicates.indexOf(j);

						if (index === -1 || (i & (1 << index)) === 0) {
							return predicate;
						}

						return polarizedPredicate(predicate);
					})
				}
			};

			newResults.push(newResult);
		}
	}

	return newResults;
}

function isPossiblyPolarPredicate(predicate: Predicate) {
	if (predicate.preverbs.length >= 2) {
		return (
			predicate.preverbs[0].negated &&
			!predicate.preverbs[1].negated &&
			predicate.preverbs[0].preverb.value ===
				predicate.preverbs[1].preverb.value
		);
	} else if (predicate.preverbs.length === 0) {
		if (predicate.kind !== 'preposition') {
			return (
				predicate.verb.modifiers &&
				predicate.verb.modifiers.simple.length >= 2 &&
				predicate.verb.modifiers.simple[0].value === 'ala' &&
				predicate.verb.modifiers.simple[1].value ===
					predicate.verb.head.value
			);
		}

		return (
			predicate.prepositions.length >= 1 &&
			!predicate.verb.preposition.negated &&
			!hasModifiers(predicate.verb.phrase) &&
			predicate.verb.phrase.head.value === 'ala' &&
			!predicate.prepositions[0].preposition.negated &&
			predicate.verb.preposition.preposition.value ===
				predicate.prepositions[0].preposition.preposition.value
		);
	}

	return false;
}

function polarizedPredicate(predicate: Predicate): Predicate {
	if (predicate.preverbs.length >= 2) {
		return {
			...predicate,
			preverbs: [
				{
					...predicate.preverbs[0],
					negated: null,
					polarQuestion: {
						type: 'polar_question',
						tokens: [
							predicate.preverbs[0].negated as Token,
							predicate.preverbs[1].preverb
						]
					}
				},
				...predicate.preverbs.slice(2)
			]
		};
	}

	if (predicate.kind !== 'preposition') {
		return {
			...predicate,
			verb: {
				...predicate.verb,
				polarQuestion: {
					type: 'polar_question',
					tokens: [
						predicate.verb.modifiers.simple[0],
						predicate.verb.modifiers.simple[1]
					]
				},
				modifiers: {
					...predicate.verb.modifiers,
					simple: predicate.verb.modifiers.simple.slice(2)
				}
			}
		};
	}

	return {
		...predicate,
		verb: {
			...predicate.verb,
			polarQuestion: {
				type: 'polar_question',
				tokens: [
					predicate.verb.phrase.head,
					predicate.prepositions[0].preposition.preposition
				]
			},
			phrase: predicate.prepositions[0].phrase
		},
		prepositions: predicate.prepositions.slice(1)
	};
}

function hasModifiers(phrase: Phrase) {
	return (
		!!phrase.modifiers &&
		(phrase.modifiers.simple.length > 0 ||
			!!phrase.modifiers.number ||
			phrase.modifiers.nanpaPhrases.length > 0 ||
			phrase.modifiers.piPhrases.length > 0)
	);
}

const goodNodes: Node['type'][] = [
	'nanpa_phrase',
	'preverb',
	'preposition',
	'polar_question',
	'clause',
	'sentence'
];

function scoreNode(node: Node): number {
	let score = 0;

	if ('index' in node) {
		return score;
	}

	const children = Object.values(node)
		.filter(value => value && typeof value === 'object')
		.flat()
		.filter(value => value && 'type' in value);

	if (goodNodes.includes(node.type)) {
		score += 1;
	}

	if (node.type === 'polar_question') {
		// additional compensation for it decreasing the number of preverbs and prepositions
		score += 0.5;
	}

	// 'ala' and 'taso' are rare as heads
	if (
		node.type === 'phrase' &&
		(node.head.value === 'ala' || node.head.value === 'taso')
	) {
		score -= 1;
	} else if (node.type === 'number') {
		score += node.tokens.length / 2;

		// 'luka' 'mute' and 'ale' are typically not used as numbers on their own
		if (
			node.tokens.length === 1 &&
			node.tokens[0].value !== 'wan' &&
			node.tokens[0].value !== 'tu'
		) {
			score -= 1;
		}
	}

	for (const child of children) {
		score += scoreNode(child);
	}

	return score;
}

function sortResults(results: Result[]): ScoredResult[] {
	const scoredResults = results
		.map(result => ({
			score: scoreNode(result),
			result
		}))
		.sort((a, b) => b.score - a.score);

	const exps = scoredResults.map(sr => Math.exp(sr.score));
	const sum = exps.reduce((a, b) => a + b, 0);

	for (let i = 0; i < scoredResults.length; i++) {
		scoredResults[i].score = exps[i] / sum;
	}

	return scoredResults;
}
