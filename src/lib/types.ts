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
	number: NumberPhrase | null;
	nanpaPhrases: NanpaPhrase[];
	piPhrases: PiPhrase[];
};

export type NumberPhrase = {
	type: 'number';
	tokens: Token[];
};

export type NanpaPhrase = {
	type: 'nanpa_phrase';
	nanpa: Token;
	number: NumberPhrase;
};

export type PiPhrase = {
	type: 'pi_phrase';
	pi: Token;
	head: Token;
	modifiers: Modifiers;
};

export type PolarQuestion = {
	type: 'polar_question';
	tokens: [Token, Token];
};

export type TransitivePredicate = {
	type: 'predicate';
	kind: 'transitive';
	marker?: Token;
	preverbs: Preverb[];
	verb: SimpleVerb;
	objects: ObjectPhrase[];
};

export type IntransitivePredicate = {
	type: 'predicate';
	kind: 'intransitive';
	marker?: Token;
	preverbs: Preverb[];
	verb: SimpleVerb;
	prepositions: PrepositionPhrase[];
};

export type PrepositionPredicate = {
	type: 'predicate';
	kind: 'preposition';
	marker?: Token;
	preverbs: Preverb[];
	verb: PrepositionVerb;
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
	polarQuestion?: PolarQuestion;
};

export type SimpleVerb = {
	type: 'verb';
	kind: 'default';
	head: Token;
	polarQuestion?: PolarQuestion;
	modifiers: Modifiers;
};

export type PrepositionVerb = {
	type: 'verb';
	kind: 'preposition';
	preposition: Preposition;
	polarQuestion?: PolarQuestion;
	phrase: Phrase;
};

export type ObjectPhrase = {
	type: 'object';
	marker: Token;
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
	marker?: Token;
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
	subjects: Subject[];
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
	kin?: Token;
	questionTag?: QuestionTag;
	emphasis?: Token;
};

export type Interjection = {
	type: 'interjection';
	subjects: Subject[];
};

export type Vocative = {
	type: 'vocative';
	subjects: Subject[];
	o: Token;
};

export type Result = Sentence | Interjection | Vocative;

export type Node =
	| Token
	| Phrase
	| Modifiers
	| NumberPhrase
	| NanpaPhrase
	| PiPhrase
	| PolarQuestion
	| Predicate
	| Preverb
	| SimpleVerb
	| PrepositionVerb
	| ObjectPhrase
	| PrepositionPhrase
	| Preposition
	| Subject
	| Context
	| Clause
	| QuestionTag
	| Sentence
	| Interjection
	| Vocative;
