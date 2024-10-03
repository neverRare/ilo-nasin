// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
// Bypasses TS6133. Allow declared but unused functions.
// @ts-ignore
function id(d: any[]): any { return d[0]; }
declare var word_unmarked_subject: any;
declare var word_preverb: any;
declare var word_preposition: any;
declare var word_number: any;
declare var word_content: any;
declare var word_modifier_only: any;

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

interface NearleyToken {
  value: any;
  [key: string]: any;
};

interface NearleyLexer {
  reset: (chunk: string, info: any) => void;
  next: () => NearleyToken | undefined;
  save: () => any;
  formatError: (token: never) => string;
  has: (tokenType: string) => boolean;
};

interface NearleyRule {
  name: string;
  symbols: NearleySymbol[];
  postprocess?: (d: any[], loc?: number, reject?: {}) => any;
};

type NearleySymbol = string | { literal: any } | { test: (token: any) => boolean };

interface Grammar {
  Lexer: NearleyLexer | undefined;
  ParserRules: NearleyRule[];
  ParserStart: string;
};

const grammar: Grammar = {
  Lexer: lexer,
  ParserRules: [
    {"name": "main", "symbols": ["Sentence"], "postprocess": id},
    {"name": "main", "symbols": ["Interjection"], "postprocess": id},
    {"name": "main", "symbols": ["Vocative"], "postprocess": id},
    {"name": "Interjection", "symbols": ["GeneralSubject"], "postprocess": ([subjects]) => ({ type: "interjection", subjects })},
    {"name": "Vocative", "symbols": ["GeneralSubject", {"literal":"o"}], "postprocess": ([subjects, o]) => ({ type: "vocative", subjects, o})},
    {"name": "Sentence$ebnf$1", "symbols": [{"literal":"taso"}], "postprocess": id},
    {"name": "Sentence$ebnf$1", "symbols": [], "postprocess": () => null},
    {"name": "Sentence$ebnf$2", "symbols": []},
    {"name": "Sentence$ebnf$2", "symbols": ["Sentence$ebnf$2", "Context"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "Sentence$ebnf$3", "symbols": [{"literal":"kin"}], "postprocess": id},
    {"name": "Sentence$ebnf$3", "symbols": [], "postprocess": () => null},
    {"name": "Sentence$ebnf$4", "symbols": ["QuestionTag"], "postprocess": id},
    {"name": "Sentence$ebnf$4", "symbols": [], "postprocess": () => null},
    {"name": "Sentence$ebnf$5", "symbols": [{"literal":"a"}], "postprocess": id},
    {"name": "Sentence$ebnf$5", "symbols": [], "postprocess": () => null},
    {"name": "Sentence", "symbols": ["Sentence$ebnf$1", "Sentence$ebnf$2", "Clause", "Sentence$ebnf$3", "Sentence$ebnf$4", "Sentence$ebnf$5"], "postprocess": ([conjunction, contexts, clause, kin, questionTag, emphasis]) => ({ type: "sentence", conjunction, contexts, clause, kin, questionTag, emphasis })},
    {"name": "Context", "symbols": ["ContextConjunction"], "postprocess": id},
    {"name": "Context", "symbols": ["ContextPreposition"], "postprocess": id},
    {"name": "Context", "symbols": ["ContextPhrase"], "postprocess": id},
    {"name": "Context", "symbols": ["ContextClause"], "postprocess": id},
    {"name": "ContextConjunction$ebnf$1", "symbols": [{"literal":"la"}], "postprocess": id},
    {"name": "ContextConjunction$ebnf$1", "symbols": [], "postprocess": () => null},
    {"name": "ContextConjunction", "symbols": [{"literal":"kin"}, "ContextConjunction$ebnf$1"], "postprocess": ([kin, la]) => ({ type: "context", kind: "conjunction", kin, la })},
    {"name": "ContextPreposition$ebnf$1", "symbols": ["PrepositionPhrase"]},
    {"name": "ContextPreposition$ebnf$1", "symbols": ["ContextPreposition$ebnf$1", "PrepositionPhrase"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "ContextPreposition", "symbols": ["ContextPreposition$ebnf$1", {"literal":"la"}], "postprocess": ([phrases, la]) => ({ type: "context", kind: "preposition", phrases, la })},
    {"name": "ContextPhrase", "symbols": ["GeneralSubject", {"literal":"la"}], "postprocess": ([subjects, la]) => ({ type: "context", kind: "phrase", subjects, la })},
    {"name": "ContextClause", "symbols": ["Clause", {"literal":"la"}], "postprocess": ([clause, la]) => ({ type: "context", kind: "clause", clause, la })},
    {"name": "Clause", "symbols": ["UnmarkedSubjectClause"], "postprocess": id},
    {"name": "Clause", "symbols": ["MarkedSubjectClause"], "postprocess": id},
    {"name": "Clause", "symbols": ["DeonticClause"], "postprocess": id},
    {"name": "QuestionTag", "symbols": [{"literal":"anu"}, {"literal":"seme"}], "postprocess": tokens => ({ type: "question_tag", tokens })},
    {"name": "UnmarkedSubjectClause", "symbols": ["UnmarkedSubject", "Predicates"], "postprocess": ([subject, predicates]) => ({ type: "clause", kind: "unmarked_subject", subjects: [{ type: "subject", phrase: subject }], predicates })},
    {"name": "MarkedSubjectClause", "symbols": ["MarkedSubject", {"literal":"li"}, "Predicates"], "postprocess":  ([subjects, li, predicates]) => ({
        	type: "clause",
        	kind: "marked_subject",
        	subjects,
        	predicates: [{ marker: li, ...predicates[0] }, ...predicates.slice(1)]
        }) },
    {"name": "DeonticClause$ebnf$1", "symbols": ["GeneralSubject"], "postprocess": id},
    {"name": "DeonticClause$ebnf$1", "symbols": [], "postprocess": () => null},
    {"name": "DeonticClause", "symbols": ["DeonticClause$ebnf$1", "DeonticPredicates"], "postprocess": ([subjects, predicates]) => ({ type: "clause", kind: "deontic", subjects, predicates, deontic: true })},
    {"name": "UnmarkedSubject", "symbols": [(lexer.has("word_unmarked_subject") ? {type: "word_unmarked_subject"} : word_unmarked_subject)], "postprocess": ([head]) => ({ type: "phrase", head })},
    {"name": "MarkedSubject", "symbols": ["MarkedSubjectHead"], "postprocess": ([head]) => [{ type: "subject", phrase: { type: "phrase", head } }]},
    {"name": "MarkedSubject", "symbols": ["Head", "ModifiersOneRequired"], "postprocess": ([head, modifiers]) => [{ type: "subject", phrase: { type: "phrase", head, modifiers } }]},
    {"name": "MarkedSubject$ebnf$1$subexpression$1", "symbols": ["SubjectMarker", "Phrase"], "postprocess": ([marker, subject]) => ({ type: "subject", marker, phrase: subject })},
    {"name": "MarkedSubject$ebnf$1", "symbols": ["MarkedSubject$ebnf$1$subexpression$1"]},
    {"name": "MarkedSubject$ebnf$1$subexpression$2", "symbols": ["SubjectMarker", "Phrase"], "postprocess": ([marker, subject]) => ({ type: "subject", marker, phrase: subject })},
    {"name": "MarkedSubject$ebnf$1", "symbols": ["MarkedSubject$ebnf$1", "MarkedSubject$ebnf$1$subexpression$2"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "MarkedSubject", "symbols": ["Phrase", "MarkedSubject$ebnf$1"], "postprocess": ([subject, subjects]) => [{ type: "subject", phrase: subject }, ...subjects]},
    {"name": "SubjectMarker", "symbols": [{"literal":"en"}], "postprocess": id},
    {"name": "SubjectMarker", "symbols": [{"literal":"anu"}], "postprocess": id},
    {"name": "GeneralSubject", "symbols": ["UnmarkedSubject"], "postprocess": ([subject]) => [{ type: "subject", phrase: subject }]},
    {"name": "GeneralSubject", "symbols": ["MarkedSubject"], "postprocess": id},
    {"name": "Predicates$ebnf$1", "symbols": []},
    {"name": "Predicates$ebnf$1$subexpression$1", "symbols": ["PredicateMarker", "Predicate"], "postprocess": ([li, predicate]) => ({ marker: li, ...predicate })},
    {"name": "Predicates$ebnf$1", "symbols": ["Predicates$ebnf$1", "Predicates$ebnf$1$subexpression$1"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "Predicates", "symbols": ["Predicate", "Predicates$ebnf$1"], "postprocess": ([predicate, predicates]) => [predicate, ...predicates]},
    {"name": "PredicateMarker", "symbols": [{"literal":"li"}], "postprocess": id},
    {"name": "PredicateMarker", "symbols": [{"literal":"anu"}], "postprocess": id},
    {"name": "DeonticPredicates$ebnf$1$subexpression$1", "symbols": [{"literal":"o"}, "Predicate"], "postprocess": ([o, predicate]) => ({ marker: o, ...predicate })},
    {"name": "DeonticPredicates$ebnf$1", "symbols": ["DeonticPredicates$ebnf$1$subexpression$1"]},
    {"name": "DeonticPredicates$ebnf$1$subexpression$2", "symbols": [{"literal":"o"}, "Predicate"], "postprocess": ([o, predicate]) => ({ marker: o, ...predicate })},
    {"name": "DeonticPredicates$ebnf$1", "symbols": ["DeonticPredicates$ebnf$1", "DeonticPredicates$ebnf$1$subexpression$2"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "DeonticPredicates", "symbols": ["DeonticPredicates$ebnf$1"], "postprocess": id},
    {"name": "Predicate", "symbols": ["TransitivePredicate"], "postprocess": id},
    {"name": "Predicate", "symbols": ["IntransitivePredicate"], "postprocess": id},
    {"name": "Predicate", "symbols": ["PrepositionPredicate"], "postprocess": id},
    {"name": "TransitivePredicate$ebnf$1", "symbols": []},
    {"name": "TransitivePredicate$ebnf$1", "symbols": ["TransitivePredicate$ebnf$1", "Preverb"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "TransitivePredicate", "symbols": ["TransitivePredicate$ebnf$1", "Phrase", "ObjectPhrases"], "postprocess": ([preverbs, verb, objects]) => ({ type: "predicate", kind: "transitive", preverbs, verb: verbify(verb), objects })},
    {"name": "IntransitivePredicate$ebnf$1", "symbols": []},
    {"name": "IntransitivePredicate$ebnf$1", "symbols": ["IntransitivePredicate$ebnf$1", "Preverb"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "IntransitivePredicate$ebnf$2", "symbols": []},
    {"name": "IntransitivePredicate$ebnf$2", "symbols": ["IntransitivePredicate$ebnf$2", "PrepositionPhrase"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "IntransitivePredicate", "symbols": ["IntransitivePredicate$ebnf$1", "Phrase", "IntransitivePredicate$ebnf$2"], "postprocess": ([preverbs, verb, prepositions]) => ({ type: "predicate", kind: "intransitive", preverbs, verb: verbify(verb), prepositions })},
    {"name": "PrepositionPredicate$ebnf$1", "symbols": []},
    {"name": "PrepositionPredicate$ebnf$1", "symbols": ["PrepositionPredicate$ebnf$1", "Preverb"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "PrepositionPredicate$ebnf$2", "symbols": []},
    {"name": "PrepositionPredicate$ebnf$2", "symbols": ["PrepositionPredicate$ebnf$2", "PrepositionPhrase"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "PrepositionPredicate", "symbols": ["PrepositionPredicate$ebnf$1", "PrepositionPhrase", "PrepositionPredicate$ebnf$2"], "postprocess": ([preverbs, verb, prepositions]) => ({ type: "predicate", kind: "preposition", preverbs, verb: verbify(verb), prepositions })},
    {"name": "Preverb$ebnf$1", "symbols": [{"literal":"ala"}], "postprocess": id},
    {"name": "Preverb$ebnf$1", "symbols": [], "postprocess": () => null},
    {"name": "Preverb", "symbols": [(lexer.has("word_preverb") ? {type: "word_preverb"} : word_preverb), "Preverb$ebnf$1"], "postprocess": ([preverb, negated]) => ({ type: "preverb", preverb, negated })},
    {"name": "ObjectPhrases$ebnf$1", "symbols": []},
    {"name": "ObjectPhrases$ebnf$1$subexpression$1", "symbols": ["ObjectMarker", "ObjectPhrase"], "postprocess": ([marker, object]) => ({ marker, ...object })},
    {"name": "ObjectPhrases$ebnf$1", "symbols": ["ObjectPhrases$ebnf$1", "ObjectPhrases$ebnf$1$subexpression$1"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "ObjectPhrases", "symbols": [{"literal":"e"}, "ObjectPhrase", "ObjectPhrases$ebnf$1"], "postprocess": ([e, object, objects]) => [{ marker: e, ...object }, ...objects]},
    {"name": "ObjectMarker", "symbols": [{"literal":"e"}], "postprocess": id},
    {"name": "ObjectMarker", "symbols": [{"literal":"anu"}], "postprocess": id},
    {"name": "ObjectPhrase$ebnf$1", "symbols": []},
    {"name": "ObjectPhrase$ebnf$1", "symbols": ["ObjectPhrase$ebnf$1", "PrepositionPhrase"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "ObjectPhrase", "symbols": ["Phrase", "ObjectPhrase$ebnf$1"], "postprocess": ([object, prepositions]) => ({ type: "object", object, prepositions })},
    {"name": "PrepositionPhrase", "symbols": ["Preposition", "Phrase"], "postprocess": ([preposition, phrase]) => ({ type: "preposition_phrase", preposition, phrase })},
    {"name": "Preposition$ebnf$1", "symbols": [{"literal":"ala"}], "postprocess": id},
    {"name": "Preposition$ebnf$1", "symbols": [], "postprocess": () => null},
    {"name": "Preposition", "symbols": [(lexer.has("word_preposition") ? {type: "word_preposition"} : word_preposition), "Preposition$ebnf$1"], "postprocess": ([preposition, negated]) => ({ type: "preposition", preposition, negated })},
    {"name": "Phrase", "symbols": ["Head", "Modifiers"], "postprocess": ([head, modifiers]) => ({ type: "phrase", head, modifiers })},
    {"name": "Modifiers$ebnf$1", "symbols": []},
    {"name": "Modifiers$ebnf$1", "symbols": ["Modifiers$ebnf$1", "ModifierWord"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "Modifiers$ebnf$2", "symbols": ["NumberPhrase"], "postprocess": id},
    {"name": "Modifiers$ebnf$2", "symbols": [], "postprocess": () => null},
    {"name": "Modifiers$ebnf$3", "symbols": []},
    {"name": "Modifiers$ebnf$3", "symbols": ["Modifiers$ebnf$3", "NanpaPhrase"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "Modifiers$ebnf$4", "symbols": []},
    {"name": "Modifiers$ebnf$4", "symbols": ["Modifiers$ebnf$4", "PiPhrase"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "Modifiers", "symbols": ["Modifiers$ebnf$1", "Modifiers$ebnf$2", "Modifiers$ebnf$3", "Modifiers$ebnf$4"], "postprocess": idModifiers},
    {"name": "ModifiersOneRequired$ebnf$1", "symbols": ["ModifierWord"]},
    {"name": "ModifiersOneRequired$ebnf$1", "symbols": ["ModifiersOneRequired$ebnf$1", "ModifierWord"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "ModifiersOneRequired$ebnf$2", "symbols": ["NumberPhrase"], "postprocess": id},
    {"name": "ModifiersOneRequired$ebnf$2", "symbols": [], "postprocess": () => null},
    {"name": "ModifiersOneRequired$ebnf$3", "symbols": []},
    {"name": "ModifiersOneRequired$ebnf$3", "symbols": ["ModifiersOneRequired$ebnf$3", "NanpaPhrase"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "ModifiersOneRequired$ebnf$4", "symbols": []},
    {"name": "ModifiersOneRequired$ebnf$4", "symbols": ["ModifiersOneRequired$ebnf$4", "PiPhrase"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "ModifiersOneRequired", "symbols": ["ModifiersOneRequired$ebnf$1", "ModifiersOneRequired$ebnf$2", "ModifiersOneRequired$ebnf$3", "ModifiersOneRequired$ebnf$4"], "postprocess": idModifiers},
    {"name": "ModifiersOneRequired$ebnf$5", "symbols": []},
    {"name": "ModifiersOneRequired$ebnf$5", "symbols": ["ModifiersOneRequired$ebnf$5", "NanpaPhrase"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "ModifiersOneRequired$ebnf$6", "symbols": []},
    {"name": "ModifiersOneRequired$ebnf$6", "symbols": ["ModifiersOneRequired$ebnf$6", "PiPhrase"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "ModifiersOneRequired", "symbols": ["NumberPhrase", "ModifiersOneRequired$ebnf$5", "ModifiersOneRequired$ebnf$6"], "postprocess": idModifiers},
    {"name": "ModifiersOneRequired$ebnf$7", "symbols": ["NanpaPhrase"]},
    {"name": "ModifiersOneRequired$ebnf$7", "symbols": ["ModifiersOneRequired$ebnf$7", "NanpaPhrase"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "ModifiersOneRequired$ebnf$8", "symbols": []},
    {"name": "ModifiersOneRequired$ebnf$8", "symbols": ["ModifiersOneRequired$ebnf$8", "PiPhrase"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "ModifiersOneRequired", "symbols": ["ModifiersOneRequired$ebnf$7", "ModifiersOneRequired$ebnf$8"], "postprocess": idModifiers},
    {"name": "ModifiersOneRequired$ebnf$9", "symbols": ["PiPhrase"]},
    {"name": "ModifiersOneRequired$ebnf$9", "symbols": ["ModifiersOneRequired$ebnf$9", "PiPhrase"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "ModifiersOneRequired", "symbols": ["ModifiersOneRequired$ebnf$9"], "postprocess": idModifiers},
    {"name": "NanpaPhrase", "symbols": [{"literal":"nanpa"}, "NumberPhrase"], "postprocess": ([nanpa, number]) => ({ type: "nanpa_phrase", nanpa, number })},
    {"name": "PiPhrase", "symbols": [{"literal":"pi"}, "Head", "ModifiersOneRequired"], "postprocess": ([pi, head, modifiers]) => ({ type: "pi_phrase", pi, head, modifiers })},
    {"name": "NumberPhrase$ebnf$1", "symbols": [(lexer.has("word_number") ? {type: "word_number"} : word_number)]},
    {"name": "NumberPhrase$ebnf$1", "symbols": ["NumberPhrase$ebnf$1", (lexer.has("word_number") ? {type: "word_number"} : word_number)], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "NumberPhrase", "symbols": ["NumberPhrase$ebnf$1"], "postprocess": ([tokens]) => ({ type: "number", tokens })},
    {"name": "Head", "symbols": [(lexer.has("word_content") ? {type: "word_content"} : word_content)], "postprocess": id},
    {"name": "Head", "symbols": [(lexer.has("word_preposition") ? {type: "word_preposition"} : word_preposition)], "postprocess": id},
    {"name": "Head", "symbols": [(lexer.has("word_preverb") ? {type: "word_preverb"} : word_preverb)], "postprocess": id},
    {"name": "Head", "symbols": [(lexer.has("word_number") ? {type: "word_number"} : word_number)], "postprocess": id},
    {"name": "Head", "symbols": [(lexer.has("word_unmarked_subject") ? {type: "word_unmarked_subject"} : word_unmarked_subject)], "postprocess": id},
    {"name": "MarkedSubjectHead", "symbols": [(lexer.has("word_content") ? {type: "word_content"} : word_content)], "postprocess": id},
    {"name": "MarkedSubjectHead", "symbols": [(lexer.has("word_preposition") ? {type: "word_preposition"} : word_preposition)], "postprocess": id},
    {"name": "MarkedSubjectHead", "symbols": [(lexer.has("word_preverb") ? {type: "word_preverb"} : word_preverb)], "postprocess": id},
    {"name": "MarkedSubjectHead", "symbols": [(lexer.has("word_number") ? {type: "word_number"} : word_number)], "postprocess": id},
    {"name": "ModifierWord", "symbols": ["Head"], "postprocess": id},
    {"name": "ModifierWord", "symbols": [(lexer.has("word_modifier_only") ? {type: "word_modifier_only"} : word_modifier_only)], "postprocess": id}
  ],
  ParserStart: "main",
};

export default grammar;
