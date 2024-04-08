// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
// Bypasses TS6133. Allow declared but unused functions.
// @ts-ignore
function id(d: any[]): any { return d[0]; }
declare var preverb: any;
declare var preposition: any;
declare var number: any;
declare var content: any;
declare var unmarkedSubject: any;
declare var modifierOnly: any;

import { TokiPonaLexer } from "./lex";

const lexer = new TokiPonaLexer();

function idModifiers([modifierWords, nanpaPhrases, piPhrases]: any[]): any {
	return {
		type: "phrase",
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
    {"name": "Vocative", "symbols": ["Phrase", {"literal":"o"}], "postprocess": ([phrase]) => ({ type: "vocative", phrase })},
    {"name": "Sentence$ebnf$1", "symbols": [{"literal":"taso"}], "postprocess": id},
    {"name": "Sentence$ebnf$1", "symbols": [], "postprocess": () => null},
    {"name": "Sentence$ebnf$2", "symbols": []},
    {"name": "Sentence$ebnf$2", "symbols": ["Sentence$ebnf$2", "Context"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "Sentence", "symbols": ["Sentence$ebnf$1", "Sentence$ebnf$2", "Clause"], "postprocess": ([conjunction, contexts, clause]) => ({ conjunction, contexts, clause })},
    {"name": "Context$ebnf$1", "symbols": [{"literal":"la"}], "postprocess": id},
    {"name": "Context$ebnf$1", "symbols": [], "postprocess": () => null},
    {"name": "Context", "symbols": [{"literal":"kin"}, "Context$ebnf$1"], "postprocess": ([conjunction]) => ({ type: "context", kind: "conjunction", conjunction })},
    {"name": "Context", "symbols": ["Phrase", {"literal":"la"}], "postprocess": ([phrase]) => ({ type: "context", kind: "phrase", phrase })},
    {"name": "Context", "symbols": ["Clause", {"literal":"la"}], "postprocess": ([clause]) => ({ type: "context", kind: "clause", clause })},
    {"name": "Clause", "symbols": ["UnmarkedSubjectClause"], "postprocess": id},
    {"name": "Clause", "symbols": ["MarkedSubjectClause"], "postprocess": id},
    {"name": "Clause", "symbols": ["DeonticClause"], "postprocess": id},
    {"name": "UnmarkedSubjectClause", "symbols": ["UnmarkedSubject", "Predicates"], "postprocess": ([subject, predicates]) => ({ subjects: [{ type: "phrase", head: subject }], predicates })},
    {"name": "MarkedSubjectClause", "symbols": ["MarkedSubject", {"literal":"li"}, "Predicates"], "postprocess": ([subjects, _, predicates]) => ({ subjects, predicates })},
    {"name": "DeonticClause", "symbols": ["DeonticSubject", "DeonticPredicates"], "postprocess": ([subject, predicates]) => ({ subjects: [subject], predicates, deontic: true })},
    {"name": "UnmarkedSubject", "symbols": [{"literal":"mi"}], "postprocess": id},
    {"name": "UnmarkedSubject", "symbols": [{"literal":"sina"}], "postprocess": id},
    {"name": "MarkedSubject", "symbols": ["MarkedSubjectHead"], "postprocess": ([head]) => [{ type: "phrase", head }]},
    {"name": "MarkedSubject", "symbols": ["Head", "ModifiersOneRequired"], "postprocess": ([head, modifiers]) => [{ type: "phrase", head, modifiers }]},
    {"name": "MarkedSubject$ebnf$1$subexpression$1", "symbols": [{"literal":"en"}, "Phrase"], "postprocess": ([_, subject]) => subject},
    {"name": "MarkedSubject$ebnf$1", "symbols": ["MarkedSubject$ebnf$1$subexpression$1"]},
    {"name": "MarkedSubject$ebnf$1$subexpression$2", "symbols": [{"literal":"en"}, "Phrase"], "postprocess": ([_, subject]) => subject},
    {"name": "MarkedSubject$ebnf$1", "symbols": ["MarkedSubject$ebnf$1", "MarkedSubject$ebnf$1$subexpression$2"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "MarkedSubject", "symbols": ["Phrase", "MarkedSubject$ebnf$1"], "postprocess": ([subject, subjects]) => [subject, ...subjects]},
    {"name": "DeonticSubject", "symbols": ["UnmarkedSubject"], "postprocess": ([subject]) => ({ type: "phrase", head: subject })},
    {"name": "DeonticSubject", "symbols": ["MarkedSubject"], "postprocess": id},
    {"name": "Predicates$ebnf$1", "symbols": []},
    {"name": "Predicates$ebnf$1$subexpression$1", "symbols": [{"literal":"li"}, "Predicate"], "postprocess": ([_, predicate]) => predicate},
    {"name": "Predicates$ebnf$1", "symbols": ["Predicates$ebnf$1", "Predicates$ebnf$1$subexpression$1"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "Predicates", "symbols": ["Predicate", "Predicates$ebnf$1"], "postprocess": ([predicate, predicates]) => [predicate, ...predicates]},
    {"name": "DeonticPredicates$ebnf$1$subexpression$1", "symbols": [{"literal":"o"}, "Predicate"], "postprocess": ([_, predicate]) => predicate},
    {"name": "DeonticPredicates$ebnf$1", "symbols": ["DeonticPredicates$ebnf$1$subexpression$1"]},
    {"name": "DeonticPredicates$ebnf$1$subexpression$2", "symbols": [{"literal":"o"}, "Predicate"], "postprocess": ([_, predicate]) => predicate},
    {"name": "DeonticPredicates$ebnf$1", "symbols": ["DeonticPredicates$ebnf$1", "DeonticPredicates$ebnf$1$subexpression$2"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "DeonticPredicates", "symbols": ["DeonticPredicates$ebnf$1"], "postprocess": id},
    {"name": "Predicate$ebnf$1", "symbols": []},
    {"name": "Predicate$ebnf$1", "symbols": ["Predicate$ebnf$1", "Preverb"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "Predicate$ebnf$2", "symbols": []},
    {"name": "Predicate$ebnf$2", "symbols": ["Predicate$ebnf$2", "Object"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "Predicate", "symbols": ["Predicate$ebnf$1", "Phrase", "Predicate$ebnf$2"], "postprocess": ([preverbs, verb, objects]) => ({ preverbs, verb, objects })},
    {"name": "Preverb$ebnf$1", "symbols": [{"literal":"ala"}], "postprocess": id},
    {"name": "Preverb$ebnf$1", "symbols": [], "postprocess": () => null},
    {"name": "Preverb", "symbols": [(lexer.has("preverb") ? {type: "preverb"} : preverb), "Preverb$ebnf$1"], "postprocess": ([preverb, negated]) => ({ type: "preverb", preverb, negated })},
    {"name": "Object$ebnf$1", "symbols": []},
    {"name": "Object$ebnf$1", "symbols": ["Object$ebnf$1", "PrepositionPhrase"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "Object", "symbols": [{"literal":"e"}, "Phrase", "Object$ebnf$1"], "postprocess": ([_, object, prepositions]) => ({ object, prepositions })},
    {"name": "PrepositionPhrase", "symbols": ["Preposition", "Phrase"], "postprocess": ([preposition, phrase]) => ({ preposition, phrase })},
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
    {"name": "NanpaPhrase", "symbols": [{"literal":"nanpa"}, "NanpaPhrase$ebnf$1"], "postprocess": ([_, numbers]) => ({ type: "nanpa", numbers })},
    {"name": "PiPhrase", "symbols": [{"literal":"pi"}, "Head", "ModifiersOneRequired"], "postprocess": ([_, head, modifiers]) => ({ type: "pi", head, modifiers })},
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
