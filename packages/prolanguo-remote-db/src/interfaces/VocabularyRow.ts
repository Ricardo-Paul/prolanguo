import { DeepPartial } from "@prolanguo/prolanguo-common/dist/extended-types";
import { VocabularyStatus } from "@prolanguo/prolanguo-common/enums";
import { Definition } from "@prolanguo/prolanguo-common/interfaces";
import { Category } from "@prolanguo/prolanguo-common/interfaces";
import { VocabularyWriting } from "@prolanguo/prolanguo-common/interfaces";

export interface VocabularyRow {
  readonly userId: string, //added
  readonly setId: string, //added
  readonly vocabularyId: string,
  readonly vocabularyText: string,
  readonly vocabularyStatus: VocabularyStatus,
  readonly level: number,
  readonly lastLearnedAt: null | Date,
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly updatedStatusAt: null | Date;
  readonly firstSyncedAt: null | Date;
  readonly lastSyncedAt: null | Date;
}

export type VocabularyRowForInsert = Omit<VocabularyRow, 'firstSyncedAt' | 'lastSyncedAt'>;
export type VocabularyRowForUpsert = DeepPartial<VocabularyRow>;
