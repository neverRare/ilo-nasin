<script lang="ts">
	import type { Token } from '$lib/lex';
	import type { Node } from '$lib/types';

	export let node: Node;

	function getChildrenInOrder(node: Exclude<Node, Token>): Node[] {
		const children: Node[] = [];

		switch (node.type) {
			case 'phrase':
				children.push(node.head);
				if (node.modifiers) children.push(node.modifiers);
				break;
			case 'modifiers':
				children.push(...node.simple);
				if (node.number) children.push(node.number);
				children.push(...node.nanpaPhrases);
				children.push(...node.piPhrases);
				break;
			case 'number':
				children.push(...node.tokens);
				break;
			case 'nanpa_phrase':
				children.push(node.nanpa);
				children.push(node.number);
				break;
			case 'pi_phrase':
				children.push(node.pi);
				children.push(node.head);
				children.push(node.modifiers);
				break;
			case 'polar_question':
				children.push(...node.tokens);
				break;
			case 'predicate':
				if (node.marker) children.push(node.marker);
				children.push(...node.preverbs);
				children.push(node.verb);
				switch (node.kind) {
					case 'intransitive':
					case 'preposition':
						children.push(...node.prepositions);
						break;
					case 'transitive':
						children.push(...node.objects);
						break;
				}
				break;
			case 'preverb':
				children.push(node.preverb);
				if (node.polarQuestion) children.push(node.polarQuestion);
				else if (node.negated) children.push(node.negated);
				break;
			case 'verb':
				switch (node.kind) {
					case 'default':
						children.push(node.head);
						if (node.polarQuestion)
							children.push(node.polarQuestion);
						children.push(node.modifiers);
						break;
					case 'preposition':
						children.push(node.preposition);
						if (node.polarQuestion)
							children.push(node.polarQuestion);
						children.push(node.phrase);
						break;
				}
				break;
			case 'object':
				children.push(node.e);
				children.push(node.object);
				children.push(...node.prepositions);
				break;
			case 'preposition_phrase':
				children.push(node.preposition);
				children.push(node.phrase);
				break;
			case 'preposition':
				children.push(node.preposition);
				if (node.negated) children.push(node.negated);
				break;
			case 'subject':
				if (node.en) children.push(node.en);
				children.push(node.phrase);
				break;
			case 'clause':
				if (node.subjects) children.push(...node.subjects);
				children.push(...node.predicates);
				break;
			case 'context':
				switch (node.kind) {
					case 'conjunction':
						children.push(node.kin);
						break;
					case 'preposition':
						children.push(...node.phrases);
						break;
					case 'phrase':
						children.push(node.phrase);
						break;
					case 'clause':
						children.push(node.clause);
						break;
				}
				if (node.la) children.push(node.la);
				break;
			case 'question_tag':
				children.push(...node.tokens);
				break;
			case 'sentence':
				if (node.conjunction) children.push(node.conjunction);
				children.push(...node.contexts);
				children.push(node.clause);
				if (node.questionTag) children.push(node.questionTag);
				if (node.emphasis) children.push(node.emphasis);
				break;
			case 'vocative':
				children.push(node.phrase);
				children.push(node.o);
				break;
			case 'interjection':
				children.push(node.phrase);
				break;
		}

		return children;
	}
</script>

<div class="relative">
	{#if 'index' in node}
		<p
			class="relative top-3 -mt-3 px-1 py-0.5 text-sm rounded-lg border-2 border-green-300 bg-green-50"
		>
			{node.value}
		</p>
	{:else}
		<div
			class="relative top-3 -mt-3 p-1 border-2 w-fit bg-white rounded-lg"
		>
			<p class="text-gray-500 text-xs">
				{node.type}{#if 'kind' in node && node.kind !== 'default'}: {node.kind}
				{/if}
			</p>

			<div class="mt-0.5 flex items-end justify-center gap-1">
				{#each getChildrenInOrder(node) as child}
					{#if 'index' in child || getChildrenInOrder(child).length > 0}
						<svelte:self node={child} />
					{/if}
				{/each}
			</div>
		</div>
	{/if}
</div>
