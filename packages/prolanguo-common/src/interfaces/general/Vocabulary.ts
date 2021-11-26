import { VocabularyStatus } from "../../enums/VocabularyStatus";
import { Definition } from "./Definition";
import { Category } from "./Category";
import { VocabularyWriting } from "./VocabularyWriting";

export interface Vocabulary {
  readonly vocabularyId: string,
  // readonly setId: string, setId send separately
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