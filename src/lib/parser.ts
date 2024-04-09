import nearley from 'nearley';

import grammar from './grammar';
import type { Node, Result } from './types';

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

		const mainClause = result.clause;

		const polarPredicates = mainClause.predicates
			.map((predicate, i) => {
				if (predicate.preverbs.length >= 2) {
					if (
						predicate.preverbs[0].negated &&
						!predicate.preverbs[1].negated &&
						predicate.preverbs[0].preverb.value ===
							predicate.preverbs[1].preverb.value
					) {
						return i;
					}

					return -1;
				} else if (predicate.preverbs.length === 0) {
					if (predicate.kind !== 'preposition') {
						if (
							predicate.verb.modifiers &&
							predicate.verb.modifiers.simple.length >= 2 &&
							predicate.verb.modifiers.simple[0].value ===
								'ala' &&
							predicate.verb.modifiers.simple[1].value ===
								predicate.verb.head.value
						) {
							return i;
						}

						return -1;
					} else if (
						predicate.prepositions.length >= 1 &&
						predicate.verb.preposition.negated &&
						!predicate.prepositions[0].preposition.negated &&
						predicate.verb.preposition.preposition.value ===
							predicate.prepositions[0].preposition.preposition
								.value
					) {
						return i;
					}

					return -1;
				}

				return -1;
			})
			.filter(i => i !== -1);

		if (polarPredicates.length === 0) {
			continue;
		}
	}

	return newResults;
}

const goodNodes: Node['type'][] = [
	'nanpa_phrase',
	'preverb',
	'preposition_phrase',
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

	// 'ala' and 'taso' are rare as heads
	if (
		node.type === 'phrase' &&
		(node.head.value === 'ala' || node.head.value === 'taso')
	) {
		score -= 2;
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
