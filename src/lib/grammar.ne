@preprocessor typescript

@{%
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
%}

@lexer lexer

main -> Sentence {% id %}
	| Interjection {% id %}
	| Vocative {% id %}

Interjection -> Phrase
	{% ([phrase]) => ({ type: "interjection", phrase }) %}
Vocative -> Phrase "o"
	{% ([phrase]) => ({ type: "vocative", phrase }) %}

Sentence -> "taso":? Context:* Clause
	{% ([conjunction, contexts, clause]) => ({ conjunction, contexts, clause }) %}

Context -> "kin" "la":? {% ([conjunction]) => ({ type: "context", kind: "conjunction", conjunction }) %}
	| PrepositionPhrase "la" {% ([prepositionPhrase]) => ({ type: "context", kind: "preposition", prepositionPhrase }) %}
	| Phrase "la" {% ([phrase]) => ({ type: "context", kind: "phrase", phrase }) %}
	| Clause "la" {% ([clause]) => ({ type: "context", kind: "clause", clause }) %}

Clause -> UnmarkedSubjectClause {% id %}
	| MarkedSubjectClause {% id %}
	| DeonticClause {% id %}


UnmarkedSubjectClause -> UnmarkedSubject Predicates
	{% ([subject, predicates]) => ({ subjects: [{ type: "phrase", head: subject }], predicates }) %}

MarkedSubjectClause -> MarkedSubject "li" Predicates
	{% ([subjects, _, predicates]) => ({ subjects, predicates }) %}

DeonticClause -> DeonticSubject DeonticPredicates
	{% ([subject, predicates]) => ({ subjects: [subject], predicates, deontic: true }) %}


UnmarkedSubject -> "mi" {% id %}
	| "sina" {% id %}

MarkedSubject -> MarkedSubjectHead {% ([head]) => [{ type: "phrase", head }] %}
	| Head ModifiersOneRequired {% ([head, modifiers]) => [{ type: "phrase", head, modifiers }] %}
	| Phrase ( "en" Phrase {% ([_, subject]) => subject %} ):+ {% ([subject, subjects]) => [subject, ...subjects] %}

DeonticSubject -> UnmarkedSubject {% ([subject]) => ({ type: "phrase", head: subject }) %}
	| MarkedSubject {% id %}


Predicates -> Predicate ( "li" Predicate {% ([_, predicate]) => predicate %} ):*
	{% ([predicate, predicates]) => [predicate, ...predicates] %}

DeonticPredicates -> ("o" Predicate {% ([_, predicate]) => predicate %} ):+
	{% id %}

Predicate -> Preverb:* Phrase Object:*
	{% ([preverbs, verb, objects]) => ({ preverbs, verb, objects }) %}

Preverb -> %preverb "ala":?
	{% ([preverb, negated]) => ({ type: "preverb", preverb, negated }) %}


Object -> "e" Phrase PrepositionPhrase:*
	{% ([_, object, prepositions]) => ({ object, prepositions }) %}


PrepositionPhrase -> Preposition Phrase
	{% ([preposition, phrase]) => ({ preposition, phrase }) %}

Preposition -> %preposition "ala":?
	{% ([preposition, negated]) => ({ type: "preposition", preposition, negated }) %}


Phrase -> Head Modifiers
	{% ([head, modifiers]) => ({ type: "phrase", head, modifiers }) %}

Modifiers -> ModifierWord:* NanpaPhrase:* PiPhrase:* {% idModifiers %}

ModifiersOneRequired -> ModifierWord:+ NanpaPhrase:* PiPhrase:* {% idModifiers %}
	| null NanpaPhrase:+ PiPhrase:* {% idModifiers %}
	| null null PiPhrase:+ {% idModifiers %}

NanpaPhrase -> "nanpa" %number:+
	{% ([_, numbers]) => ({ type: "nanpa", numbers }) %}
PiPhrase -> "pi" Head ModifiersOneRequired
	{% ([_, head, modifiers]) => ({ type: "pi", head, modifiers }) %}


Head -> %content {% id %}
	| %preposition {% id %}
	| %preverb {% id %}
	| %number {% id %}
	| %unmarkedSubject {% id %}
MarkedSubjectHead -> %content {% id %}
	| %preposition {% id %}
	| %preverb {% id %}
	| %number {% id %}
ModifierWord -> Head {% id %}
	| %modifierOnly {% id %}
