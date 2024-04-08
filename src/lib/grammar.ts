// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
// Bypasses TS6133. Allow declared but unused functions.
// @ts-ignore
function id(d: any[]): any { return d[0]; }
declare var unmarkedSubject: any;
declare var preverb: any;
declare var preposition: any;
declare var number: any;
declare var content: any;
declare var modifierOnly: any;

import { TokiPonaLexer } from "./lex";

const lexer = new TokiPonaLexer();

function idModifiers([modifierWords, nanpaPhrases, piPhrases]: any[]): any {
	return {
		type: "modifiers",
		modifierWords: modifierWords || [],
		nanpaPhrases: nanpaPhrases || [],
		piPhrases: piPhrases || []
	};
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
    {"name": "Interjection", "symbols": ["Phrase"], "postprocess": ([phrase]) => ({ type: "interjection", phrase })},
    {"name": "Vocative", "symbols": ["Phrase", {"literal":"o"}], "postprocess": ([phrase, o]) => ({ type: "vocative", phrase, o})},
    {"name": "Sentence$ebnf$1", "symbols": [{"literal":"taso"}], "postprocess": id},
    {"name": "Sentence$ebnf$1", "symbols": [], "postprocess": () => null},
    {"name": "Sentence$ebnf$2", "symbols": []},
    {"name": "Sentence$ebnf$2", "symbols": ["Sentence$ebnf$2", "Context"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "Sentence$ebnf$3", "symbols": ["QuestionTag"], "postprocess": id},
    {"name": "Sentence$ebnf$3", "symbols": [], "postprocess": () => null},
    {"name": "Sentence$ebnf$4", "symbols": [{"literal":"a"}], "postprocess": id},
    {"name": "Sentence$ebnf$4", "symbols": [], "postprocess": () => null},
    {"name": "Sentence", "symbols": ["Sentence$ebnf$1", "Sentence$ebnf$2", "Clause", "Sentence$ebnf$3", "Sentence$ebnf$4"], "postprocess": ([conjunction, contexts, clause, questionTag, emphasis]) => ({ type: "sentence", conjunction, contexts, clause, questionTag, emphasis })},
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
    {"name": "ContextPhrase", "symbols": ["Phrase", {"literal":"la"}], "postprocess": ([phrase, la]) => ({ type: "context", kind: "phrase", phrase, la })},
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
    {"name": "DeonticClause$ebnf$1", "symbols": ["DeonticSubject"], "postprocess": id},
    {"name": "DeonticClause$ebnf$1", "symbols": [], "postprocess": () => null},
    {"name": "DeonticClause", "symbols": ["DeonticClause$ebnf$1", "DeonticPredicates"], "postprocess": ([subjects, predicates]) => ({ type: "clause", kind: "deontic", subjects, predicates, deontic: true })},
    {"name": "UnmarkedSubject", "symbols": [(lexer.has("unmarkedSubject") ? {type: "unmarkedSubject"} : unmarkedSubject)], "postprocess": ([head]) => ({ type: "phrase", head })},
    {"name": "MarkedSubject", "symbols": ["MarkedSubjectHead"], "postprocess": ([head]) => [{ type: "subject", phrase: { type: "phrase", head } }]},
    {"name": "MarkedSubject", "symbols": ["Head", "ModifiersOneRequired"], "postprocess": ([head, modifiers]) => [{ type: "subject", phrase: { type: "phrase", head, modifiers } }]},
    {"name": "MarkedSubject$ebnf$1$subexpression$1", "symbols": [{"literal":"en"}, "Phrase"], "postprocess": ([en, subject]) => ({ type: "subject", en, phrase: subject })},
    {"name": "MarkedSubject$ebnf$1", "symbols": ["MarkedSubject$ebnf$1$subexpression$1"]},
    {"name": "MarkedSubject$ebnf$1$subexpression$2", "symbols": [{"literal":"en"}, "Phrase"], "postprocess": ([en, subject]) => ({ type: "subject", en, phrase: subject })},
    {"name": "MarkedSubject$ebnf$1", "symbols": ["MarkedSubject$ebnf$1", "MarkedSubject$ebnf$1$subexpression$2"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "MarkedSubject", "symbols": ["Phrase", "MarkedSubject$ebnf$1"], "postprocess": ([subject, subjects]) => [{ type: "subject", phrase: subject }, ...subjects]},
    {"name": "DeonticSubject", "symbols": ["UnmarkedSubject"], "postprocess": ([subject]) => [{ type: "subject", phrase: subject }]},
    {"name": "DeonticSubject", "symbols": ["MarkedSubject"], "postprocess": id},
    {"name": "Predicates$ebnf$1", "symbols": []},
    {"name": "Predicates$ebnf$1$subexpression$1", "symbols": [{"literal":"li"}, "Predicate"], "postprocess": ([li, predicate]) => ({ marker: li, ...predicate })},
    {"name": "Predicates$ebnf$1", "symbols": ["Predicates$ebnf$1", "Predicates$ebnf$1$subexpression$1"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "Predicates", "symbols": ["Predicate", "Predicates$ebnf$1"], "postprocess": ([predicate, predicates]) => [predicate, ...predicates]},
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
    {"name": "TransitivePredicate$ebnf$2", "symbols": ["Object"]},
    {"name": "TransitivePredicate$ebnf$2", "symbols": ["TransitivePredicate$ebnf$2", "Object"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "TransitivePredicate", "symbols": ["TransitivePredicate$ebnf$1", "Phrase", "TransitivePredicate$ebnf$2"], "postprocess": ([preverbs, verb, objects]) => ({ type: "predicate", kind: "transitive", preverbs, verb, objects })},
    {"name": "IntransitivePredicate$ebnf$1", "symbols": []},
    {"name": "IntransitivePredicate$ebnf$1", "symbols": ["IntransitivePredicate$ebnf$1", "Preverb"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "IntransitivePredicate$ebnf$2", "symbols": []},
    {"name": "IntransitivePredicate$ebnf$2", "symbols": ["IntransitivePredicate$ebnf$2", "PrepositionPhrase"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "IntransitivePredicate", "symbols": ["IntransitivePredicate$ebnf$1", "Phrase", "IntransitivePredicate$ebnf$2"], "postprocess": ([preverbs, verb, prepositions]) => ({ type: "predicate", kind: "intransitive", preverbs, verb, prepositions })},
    {"name": "PrepositionPredicate$ebnf$1", "symbols": []},
    {"name": "PrepositionPredicate$ebnf$1", "symbols": ["PrepositionPredicate$ebnf$1", "Preverb"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "PrepositionPredicate$ebnf$2", "symbols": []},
    {"name": "PrepositionPredicate$ebnf$2", "symbols": ["PrepositionPredicate$ebnf$2", "PrepositionPhrase"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "PrepositionPredicate", "symbols": ["PrepositionPredicate$ebnf$1", "PrepositionPhrase", "PrepositionPredicate$ebnf$2"], "postprocess": ([preverbs, verb, prepositions]) => ({ type: "predicate", kind: "preposition", preverbs, verb, prepositions })},
    {"name": "Preverb$ebnf$1", "symbols": [{"literal":"ala"}], "postprocess": id},
    {"name": "Preverb$ebnf$1", "symbols": [], "postprocess": () => null},
    {"name": "Preverb", "symbols": [(lexer.has("preverb") ? {type: "preverb"} : preverb), "Preverb$ebnf$1"], "postprocess": ([preverb, negated]) => ({ type: "preverb", preverb, negated })},
    {"name": "Object$ebnf$1", "symbols": []},
    {"name": "Object$ebnf$1", "symbols": ["Object$ebnf$1", "PrepositionPhrase"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "Object", "symbols": [{"literal":"e"}, "Phrase", "Object$ebnf$1"], "postprocess": ([e, object, prepositions]) => ({ type: "object", e, object, prepositions })},
    {"name": "PrepositionPhrase", "symbols": ["Preposition", "Phrase"], "postprocess": ([preposition, phrase]) => ({ type: "preposition_phrase", preposition, phrase })},
    {"name": "Preposition$ebnf$1", "symbols": [{"literal":"ala"}], "postprocess": id},
    {"name": "Preposition$ebnf$1", "symbols": [], "postprocess": () => null},
    {"name": "Preposition", "symbols": [(lexer.has("preposition") ? {type: "preposition"} : preposition), "Preposition$ebnf$1"], "postprocess": ([preposition, negated]) => ({ type: "preposition", preposition, negated })},
    {"name": "Phrase", "symbols": ["Head", "Modifiers"], "postprocess": ([head, modifiers]) => ({ type: "phrase", head, modifiers })},
    {"name": "Modifiers$ebnf$1", "symbols": []},
    {"name": "Modifiers$ebnf$1", "symbols": ["Modifiers$ebnf$1", "ModifierWord"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "Modifiers$ebnf$2", "symbols": []},
    {"name": "Modifiers$ebnf$2", "symbols": ["Modifiers$ebnf$2", "NanpaPhrase"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "Modifiers$ebnf$3", "symbols": []},
    {"name": "Modifiers$ebnf$3", "symbols": ["Modifiers$ebnf$3", "PiPhrase"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "Modifiers", "symbols": ["Modifiers$ebnf$1", "Modifiers$ebnf$2", "Modifiers$ebnf$3"], "postprocess": idModifiers},
    {"name": "ModifiersOneRequired$ebnf$1", "symbols": ["ModifierWord"]},
    {"name": "ModifiersOneRequired$ebnf$1", "symbols": ["ModifiersOneRequired$ebnf$1", "ModifierWord"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "ModifiersOneRequired$ebnf$2", "symbols": []},
    {"name": "ModifiersOneRequired$ebnf$2", "symbols": ["ModifiersOneRequired$ebnf$2", "NanpaPhrase"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "ModifiersOneRequired$ebnf$3", "symbols": []},
    {"name": "ModifiersOneRequired$ebnf$3", "symbols": ["ModifiersOneRequired$ebnf$3", "PiPhrase"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "ModifiersOneRequired", "symbols": ["ModifiersOneRequired$ebnf$1", "ModifiersOneRequired$ebnf$2", "ModifiersOneRequired$ebnf$3"], "postprocess": idModifiers},
    {"name": "ModifiersOneRequired$ebnf$4", "symbols": ["NanpaPhrase"]},
    {"name": "ModifiersOneRequired$ebnf$4", "symbols": ["ModifiersOneRequired$ebnf$4", "NanpaPhrase"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "ModifiersOneRequired$ebnf$5", "symbols": []},
    {"name": "ModifiersOneRequired$ebnf$5", "symbols": ["ModifiersOneRequired$ebnf$5", "PiPhrase"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "ModifiersOneRequired", "symbols": ["ModifiersOneRequired$ebnf$4", "ModifiersOneRequired$ebnf$5"], "postprocess": idModifiers},
    {"name": "ModifiersOneRequired$ebnf$6", "symbols": ["PiPhrase"]},
    {"name": "ModifiersOneRequired$ebnf$6", "symbols": ["ModifiersOneRequired$ebnf$6", "PiPhrase"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "ModifiersOneRequired", "symbols": ["ModifiersOneRequired$ebnf$6"], "postprocess": idModifiers},
    {"name": "NanpaPhrase$ebnf$1", "symbols": [(lexer.has("number") ? {type: "number"} : number)]},
    {"name": "NanpaPhrase$ebnf$1", "symbols": ["NanpaPhrase$ebnf$1", (lexer.has("number") ? {type: "number"} : number)], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "NanpaPhrase", "symbols": [{"literal":"nanpa"}, "NanpaPhrase$ebnf$1"], "postprocess": ([nanpa, numbers]) => ({ type: "nanpa_phrase", nanpa, numbers })},
    {"name": "PiPhrase", "symbols": [{"literal":"pi"}, "Head", "ModifiersOneRequired"], "postprocess": ([pi, head, modifiers]) => ({ type: "pi_phrase", pi, head, modifiers })},
    {"name": "Head", "symbols": [(lexer.has("content") ? {type: "content"} : content)], "postprocess": id},
    {"name": "Head", "symbols": [(lexer.has("preposition") ? {type: "preposition"} : preposition)], "postprocess": id},
    {"name": "Head", "symbols": [(lexer.has("preverb") ? {type: "preverb"} : preverb)], "postprocess": id},
    {"name": "Head", "symbols": [(lexer.has("number") ? {type: "number"} : number)], "postprocess": id},
    {"name": "Head", "symbols": [(lexer.has("unmarkedSubject") ? {type: "unmarkedSubject"} : unmarkedSubject)], "postprocess": id},
    {"name": "MarkedSubjectHead", "symbols": [(lexer.has("content") ? {type: "content"} : content)], "postprocess": id},
    {"name": "MarkedSubjectHead", "symbols": [(lexer.has("preposition") ? {type: "preposition"} : preposition)], "postprocess": id},
    {"name": "MarkedSubjectHead", "symbols": [(lexer.has("preverb") ? {type: "preverb"} : preverb)], "postprocess": id},
    {"name": "MarkedSubjectHead", "symbols": [(lexer.has("number") ? {type: "number"} : number)], "postprocess": id},
    {"name": "ModifierWord", "symbols": ["Head"], "postprocess": id},
    {"name": "ModifierWord", "symbols": [(lexer.has("modifierOnly") ? {type: "modifierOnly"} : modifierOnly)], "postprocess": id}
  ],
  ParserStart: "main",
};

export default grammar;
