<script lang="ts">
	import grammar from '$lib/grammar';
	import nearley from 'nearley';

	let text = 'soweli pona wawa';
	let results: any;

	$: if (text) {
		const parser = new nearley.Parser(
			nearley.Grammar.fromCompiled(grammar)
		);

		try {
			parser.feed(text);
			results = parser.results;
		} catch (e) {
			console.error(e);
			results = e;
		}
	}
</script>

<div class="max-w-screen-lg px-8 mx-auto">
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
		{:else if results instanceof Error}
			{results.message}
		{:else if !results.length}
			Unexpected end of input.
		{:else if results.length === 1}
			1 parse found.
		{:else}
			{results.length} parses found.
		{/if}
	</p>

	<pre class="mt-4 whitespace-pre-wrap">{JSON.stringify(
			results,
			null,
			2
		)}</pre>
</div>
