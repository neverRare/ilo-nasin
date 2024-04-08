<script lang="ts">
	import nearley from 'nearley';

	import grammar from '$lib/grammar';
	import type { Node, Result } from '$lib/types';
	import Render from './Render.svelte';

	type ScoredResult = { result: Result; score: number };

	let text = 'sina ken ala toki pona e ijo la, sina sona ala e ijo.';
	let results: ScoredResult[];
	let error: Error | null = null;

	$: if (text) {
		const parser = new nearley.Parser(
			nearley.Grammar.fromCompiled(grammar)
		);

		try {
			parser.feed(text);
			results = sortResults(parser.results);
			error = null;
		} catch (e) {
			console.error(e);
			results = [];
			error = e as Error;
		}
	}

	const goodNodes: Node['type'][] = [
		'nanpa_phrase',
		'pi_phrase',
		'preverb',
		'preposition_phrase',
		'clause',
		'sentence'
	];

	function scoreNode(node: Node): number {
		let score = 0;

		if (node.type === 'token') {
			return score;
		}

		const children = Object.values(node)
			.filter(value => value && typeof value === 'object')
			.flat()
			.filter(value => value && 'type' in value);

		console.log(children);

		if (goodNodes.includes(node.type)) {
			score += 1;
		}

		// 'ala' and 'taso' and 'kepeken' are rare as heads
		if (
			node.type === 'phrase' &&
			!('index' in node) &&
			(node.head.value === 'ala' ||
				node.head.value === 'taso' ||
				node.head.value === 'kepeken')
		) {
			score -= 2;
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
</script>

<div class="px-8">
	<h1 class="text-3xl font-bold mt-20">ilo nasin</h1>

	<input
		type="text"
		class="mt-4 w-full px-4 py-2 rounded-xl border-2 focus:border-gray-400 text-lg outline-none transition"
		bind:value={text}
		placeholder="o toki pona..."
	/>

	<p class="mt-4">
		{#if !text}
			Enter some text to parse!
		{:else if error}
			<pre class="whitespace-pre-wrap">{error.message}</pre>
		{:else if !results.length}
			Unexpected end of input.
		{:else if results.length === 1}
			1 parse found.
		{:else}
			{results.length} parses found.
		{/if}
	</p>

	{#each results as result, i}
		<div class="mt-4 mb-20">
			{#if results.length > 1}
				<h2 class="text-xl font-bold">
					Parse {i + 1}
					<span class="text-sm text-gray-500 font-normal">
						({(result.score * 100).toFixed(2)}%)
					</span>
				</h2>
			{/if}
			<Render node={result.result} />
		</div>
	{/each}
</div>
