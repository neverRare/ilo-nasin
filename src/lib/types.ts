// please stay in sync 🥺 these are manually added

import type { Token } from './lex';

export type Phrase = {
	type: 'phrase';
	head: Token;
	modifiers?: Modifiers;
};

export type Modifiers = {
	type: 'modifiers';
	simple: Token[];
	number: Number | null;
	nanpaPhrases: NanpaPhrase[];
	piPhrases: PiPhrase[];
};

export type Number = {
	type: 'number';
	words: Token[];
};

export type NanpaPhrase = {
	type: 'nanpa_phrase';
	nanpa: Token;
	number: Number;
};

export type PiPhrase = {
	type: 'pi_phrase';
	pi: Token;
	head: Token;
	modifiers: Modifiers;
};

export type TransitivePredicate = {
	type: 'predicate';
	kind: 'transitive';
	marker?: Token;
	preverbs: Preverb[];
	verb: Phrase;
	objects: Object[];
};

export type IntransitivePredicate = {
	type: 'predicate';
	kind: 'intransitive';
	marker?: Token;
	preverbs: Preverb[];
	verb: Phrase;
	prepositions: PrepositionPhrase[];
};

export type PrepositionPredicate = {
	type: 'predicate';
	kind: 'preposition';
	marker?: Token;
	preverbs: Preverb[];
	verb: PrepositionPhrase;
	prepositions: PrepositionPhrase[];
};

export type Predicate =
	| TransitivePredicate
	| IntransitivePredicate
	| PrepositionPredicate;

export type Preverb = {
	type: 'preverb';
	preverb: Token;
	negated: Token | null;
};

export type Object = {
	type: 'object';
	e: Token;
	object: Phrase;
	prepositions: PrepositionPhrase[];
};

export type PrepositionPhrase = {
	type: 'preposition_phrase';
	preposition: Preposition;
	phrase: Phrase;
};

export type Preposition = {
	type: 'preposition';
	preposition: Token;
	negated: Token | null;
};

export type Subject = {
	type: 'subject';
	en?: Token;
	phrase: Phrase;
};

export type UnmarkedSubjectClause = {
	type: 'clause';
	kind: 'unmarked_subject';
	subjects: Subject[];
	predicates: Predicate[];
};

export type MarkedSubjectClause = {
	type: 'clause';
	kind: 'marked_subject';
	subjects: Subject[];
	predicates: Predicate[];
};

export type DeonticClause = {
	type: 'clause';
	kind: 'deontic';
	subjects?: Subject[];
	predicates: Predicate[];
	deontic: true;
};

export type ContextConjunction = {
	type: 'context';
	kind: 'conjunction';
	kin: Token;
	la?: Token;
};

export type ContextPreposition = {
	type: 'context';
	kind: 'preposition';
	phrases: PrepositionPhrase[];
	la: Token;
};

export type ContextPhrase = {
	type: 'context';
	kind: 'phrase';
	phrase: Phrase;
	la: Token;
};

export type ContextClause = {
	type: 'context';
	kind: 'clause';
	clause: Clause;
	la: Token;
};

export type Context =
	| ContextConjunction
	| ContextPreposition
	| ContextPhrase
	| ContextClause;

export type Clause =
	| UnmarkedSubjectClause
	| MarkedSubjectClause
	| DeonticClause;

export type QuestionTag = {
	type: 'question_tag';
	tokens: [Token, Token];
};

export type Sentence = {
	type: 'sentence';
	conjunction?: Token;
	contexts: Context[];
	clause: Clause;
	questionTag?: QuestionTag;
	emphasis?: Token;
};

export type Interjection = {
	type: 'interjection';
	phrase: Phrase;
};

export type Vocative = {
	type: 'vocative';
	phrase: Phrase;
	o: Token;
};

export type Result = Sentence | Interjection | Vocative;

export type Node =
	| Token
	| Phrase
	| Modifiers
	| Number
	| NanpaPhrase
	| PiPhrase
	| Predicate
	| Preverb
	| Object
	| PrepositionPhrase
	| Preposition
	| Subject
	| Context
	| Clause
	| QuestionTag
	| Sentence
	| Interjection
	| Vocative;
