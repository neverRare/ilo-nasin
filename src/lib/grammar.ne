@preprocessor typescript

@{%
import { TokiPonaLexer } from "./lex";

const lexer = new TokiPonaLexer();

function idModifiers(args: any[]): any {
	let simple: any;
	let number: any = null;
	let nanpaPhrases: any;
	let piPhrases: any;

	if (args.length === 1) {
		[piPhrases] = args;
	} else if (args.length === 2) {
		[nanpaPhrases, piPhrases] = args;
	} else if (args.length === 3) {
		[number, nanpaPhrases, piPhrases] = args;
	} else if (args.length === 4) {
		[simple, number, nanpaPhrases, piPhrases] = args;
	} else {
		throw new Error("Invalid number of arguments");
	}

	return {
		type: "modifiers",
		simple: simple || [],
		number,
		nanpaPhrases: nanpaPhrases || [],
		piPhrases: piPhrases || []
	};
}

function verbify(phrase: any): any {
	if (phrase.type === "phrase") {
		return {
			type: "verb",
			kind: "default",
			head: phrase.head,
			modifiers: phrase.modifiers
		};
	} else if (phrase.type === "preposition_phrase") {
		return {
			type: "verb",
			kind: "preposition",
			preposition: phrase.preposition,
			phrase: phrase.phrase
		};
	} else {
		throw new Error("Invalid phrase type");
	}
}
%}

@lexer lexer

main -> Sentence {% id %}
	| Interjection {% id %}
	| Vocative {% id %}

Interjection -> Phrase
	{% ([phrase]) => ({ type: "interjection", phrase }) %}
Vocative -> Phrase "o"
	{% ([phrase, o]) => ({ type: "vocative", phrase, o}) %}

Sentence -> "taso":? Context:* Clause QuestionTag:? "a":?
	{% ([conjunction, contexts, clause, questionTag, emphasis]) => ({ type: "sentence", conjunction, contexts, clause, questionTag, emphasis }) %}

Context -> ContextConjunction {% id %}
	| ContextPreposition {% id %}
	| ContextPhrase {% id %}
	| ContextClause {% id %}

ContextConjunction -> "kin" "la":?
	{% ([kin, la]) => ({ type: "context", kind: "conjunction", kin, la }) %}

ContextPreposition -> PrepositionPhrase:+ "la"
	{% ([phrases, la]) => ({ type: "context", kind: "preposition", phrases, la }) %}

ContextPhrase -> Phrase "la"
	{% ([phrase, la]) => ({ type: "context", kind: "phrase", phrase, la }) %}

ContextClause -> Clause "la"
	{% ([clause, la]) => ({ type: "context", kind: "clause", clause, la }) %}

Clause -> UnmarkedSubjectClause {% id %}
	| MarkedSubjectClause {% id %}
	| DeonticClause {% id %}

QuestionTag -> "anu" "seme" {% tokens => ({ type: "question_tag", tokens }) %}


UnmarkedSubjectClause -> UnmarkedSubject Predicates
	{% ([subject, predicates]) => ({ type: "clause", kind: "unmarked_subject", subjects: [{ type: "subject", phrase: subject }], predicates }) %}

MarkedSubjectClause -> MarkedSubject "li" Predicates
	{% ([subjects, li, predicates]) => ({
		type: "clause",
		kind: "marked_subject",
		subjects,
		predicates: [{ marker: li, ...predicates[0] }, ...predicates.slice(1)]
	}) %}

DeonticClause -> DeonticSubject:? DeonticPredicates
	{% ([subjects, predicates]) => ({ type: "clause", kind: "deontic", subjects, predicates, deontic: true }) %}


UnmarkedSubject -> %word_unmarked_subject
	{% ([head]) => ({ type: "phrase", head }) %}

MarkedSubject -> MarkedSubjectHead {% ([head]) => [{ type: "subject", phrase: { type: "phrase", head } }] %}
	| Head ModifiersOneRequired {% ([head, modifiers]) => [{ type: "subject", phrase: { type: "phrase", head, modifiers } }] %}
	| Phrase ( "en" Phrase {% ([en, subject]) => ({ type: "subject", en, phrase: subject }) %} ):+
	{% ([subject, subjects]) => [{ type: "subject", phrase: subject }, ...subjects] %}

DeonticSubject -> UnmarkedSubject {% ([subject]) => [{ type: "subject", phrase: subject }] %}
	| MarkedSubject {% id %}


Predicates -> Predicate ( "li" Predicate {% ([li, predicate]) => ({ marker: li, ...predicate }) %} ):*
	{% ([predicate, predicates]) => [predicate, ...predicates] %}

DeonticPredicates -> ("o" Predicate {% ([o, predicate]) => ({ marker: o, ...predicate }) %} ):+
	{% id %}

Predicate -> TransitivePredicate {% id %}
	| IntransitivePredicate {% id %}
	| PrepositionPredicate {% id %}

TransitivePredicate -> Preverb:* Phrase Object:+
	{% ([preverbs, verb, objects]) => ({ type: "predicate", kind: "transitive", preverbs, verb: verbify(verb), objects }) %}

IntransitivePredicate -> Preverb:* Phrase PrepositionPhrase:*
	{% ([preverbs, verb, prepositions]) => ({ type: "predicate", kind: "intransitive", preverbs, verb: verbify(verb), prepositions }) %}

PrepositionPredicate -> Preverb:* PrepositionPhrase PrepositionPhrase:*
	{% ([preverbs, verb, prepositions]) => ({ type: "predicate", kind: "preposition", preverbs, verb: verbify(verb), prepositions }) %}

Preverb -> %word_preverb "ala":?
	{% ([preverb, negated]) => ({ type: "preverb", preverb, negated }) %}


Object -> "e" Phrase PrepositionPhrase:*
	{% ([e, object, prepositions]) => ({ type: "object", e, object, prepositions }) %}


PrepositionPhrase -> Preposition Phrase
	{% ([preposition, phrase]) => ({ type: "preposition_phrase", preposition, phrase }) %}

Preposition -> %word_preposition "ala":?
	{% ([preposition, negated]) => ({ type: "preposition", preposition, negated }) %}


Phrase -> Head Modifiers
	{% ([head, modifiers]) => ({ type: "phrase", head, modifiers }) %}

Modifiers -> ModifierWord:* Number:? NanpaPhrase:* PiPhrase:* {% idModifiers %}

ModifiersOneRequired -> ModifierWord:+ Number:? NanpaPhrase:* PiPhrase:* {% idModifiers %}
	| Number NanpaPhrase:* PiPhrase:* {% idModifiers %}
	| NanpaPhrase:+ PiPhrase:* {% idModifiers %}
	| PiPhrase:+ {% idModifiers %}

NanpaPhrase -> "nanpa" Number
	{% ([nanpa, number]) => ({ type: "nanpa_phrase", nanpa, number }) %}
PiPhrase -> "pi" Head ModifiersOneRequired
	{% ([pi, head, modifiers]) => ({ type: "pi_phrase", pi, head, modifiers }) %}

Number -> %word_number:+
	{% ([words]) => ({ type: "number", words }) %}

Head -> %word_content {% id %}
	| %word_preposition {% id %}
	| %word_preverb {% id %}
	| %word_number {% id %}
	| %word_unmarked_subject {% id %}
MarkedSubjectHead -> %word_content {% id %}
	| %word_preposition {% id %}
	| %word_preverb {% id %}
	| %word_number {% id %}
ModifierWord -> Head {% id %}
	| %word_modifier_only {% id %}
