<script lang="ts">
	import Render from './Render.svelte';
	import { parse, type ScoredResult } from '$lib/parser';

	let text = 'sina ken ala toki pona e ijo la, sina sona ala e ijo.';
	let results: ScoredResult[];
	let error: Error | null = null;

	let limited = true;

	$: if (text) {
		try {
			results = parse(text);
			error = null;
		} catch (e) {
			console.error(e);
			results = [];
			error = e as Error;
		}
	}
</script>

<div class="px-8 my-20">
	<h1 class="text-3xl font-bold">ilo nasin</h1>

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

	{#each limited ? results.slice(0, 5) : results as result, i}
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

	{#if results.length > 5}
		<button
			class="text-blue-500 font-semibold border-b-2 border-transparent hv:border-blue-500 transition mt-4"
			on:click={() => (limited = !limited)}
		>
			<!-- {limited ? 'Show all' : 'Show less'} -->
			{#if limited}
				Show {results.length - 5} more
			{:else}
				Show less
			{/if}
		</button>
	{/if}
</div>
