export enum VocabularyStatus{
  ACTIVE = 'ACTIVE',
  ARCHIVED = 'ARCHIVED',
  DELETED = 'DELETED'
}

export enum DefinitionStatus{
  ACTIVE = 'ACTIVE',
  DELETED = 'DELETED'
}

enum WordClass {
  NOUN = 'NOUN',
  VERB = 'VERB',
  ADJECTIVE = 'ADJECTIVE',
  ADVERB = 'ADVERB',
  PREPOSTION = 'PREPOSITION',
  PHRASAL_VERB = 'PHRASAL_VERB',
  IDIOM = 'IDOM',
  PRONOUN = 'PRONOUN'
}

interface Definition{
  readonly definitionId: string,
  readonly meaning: string,
  readonly source: string,
  readonly wordClasses: WordClass,
  readonly definitionStatus: DefinitionStatus,
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly updatedStatusAt: null | Date;
  readonly firstSyncedAt: null | Date;
  readonly lastSyncedAt: null | Date;
}

interface Category{
  readonly categoryName: string,
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly firstSyncedAt: null | Date;
  readonly lastSyncedAt: null | Date;
}

interface VocabularyWriting{
  readonly level: number,
  readonly disabled: boolean,
  readonly lastWrittenAt: null | Date,
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly firstSyncedAt: null | Date;
  readonly lastSyncedAt: null | Date;
}

export interface Vocabulary{
  readonly vocabularyId: string,
  readonly setId: string,
  readonly vocabularyText: string,
  readonly vocabularyStatus: VocabularyStatus,
  readonly level: number,
  readonly definitions: Definition[],
  readonly category: Category,
  readonly writing: VocabularyWriting,
  readonly lastLearnedAt: null | Date,
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly updatedStatusAt: null | Date;
  readonly firstSyncedAt: null | Date;
  readonly lastSyncedAt: null | Date;
}