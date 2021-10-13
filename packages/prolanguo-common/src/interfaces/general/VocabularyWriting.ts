export interface VocabularyWriting{
  readonly level: number,
  readonly disabled: boolean,
  readonly lastWrittenAt: null | Date,
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly firstSyncedAt: null | Date;
  readonly lastSyncedAt: null | Date;
}