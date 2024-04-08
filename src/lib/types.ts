// please stay in sync 🥺 these are manually added

export type TokenType =
	| 'particle'
	| 'content'
	| 'preposition'
	| 'preverb'
	| 'number'
	| 'modifierOnly'
	| 'unmarkedSubject';

export type Token = {
	type: TokenType;
	value: string;
	index: number;
};

export type Phrase = {
	type: 'phrase';
	head: Token;
	modifiers?: Modifiers;
};

export type Modifiers = {
	type: 'modifiers';
	modifierWords: Token[];
	nanpaPhrases: NanpaPhrase[];
	piPhrases: PiPhrase[];
};

export type NanpaPhrase = {
	type: 'nanpa';
	numbers: Token[];
};

export type PiPhrase = {
	type: 'pi';
	head: Token;
	modifiers: Modifiers;
};

export type Predicate = {
	preverbs: Preverb[];
	verb: Phrase;
	objects: Object[];
};

export type Preverb = {
	type: 'preverb';
	preverb: Token;
	negated: boolean;
};

export type Object = {
	object: Phrase;
	prepositions: PrepositionPhrase[];
};

export type PrepositionPhrase = {
	preposition: Preposition;
	phrase: Phrase;
};

export type Preposition = {
	type: 'preposition';
	preposition: Token;
	negated: boolean;
};

export type UnmarkedSubjectClause = {
	subjects: Phrase[];
	predicates: Predicate[];
};

export type MarkedSubjectClause = {
	subjects: Phrase[];
	predicates: Predicate[];
};

export type DeonticClause = {
	subjects: Phrase[];
	predicates: Predicate[];
	deontic: true;
};

export type Context =
	| {
			type: 'context';
			kind: 'conjunction';
			conjunction: Token;
	  }
	| {
			type: 'context';
			kind: 'phrase';
			phrase: Phrase;
	  }
	| {
			type: 'context';
			kind: 'clause';
			clause: Clause;
	  };

export type Clause =
	| UnmarkedSubjectClause
	| MarkedSubjectClause
	| DeonticClause;

export type Sentence = {
	conjunction?: Token;
	contexts: Context[];
	clause: Clause;
};

export type Interjection = {
	type: 'interjection';
	phrase: Phrase;
};

export type Vocative = {
	type: 'vocative';
	phrase: Phrase;
};
