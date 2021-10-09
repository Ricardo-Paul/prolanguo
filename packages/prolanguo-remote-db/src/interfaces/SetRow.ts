import { SetStatus } from "@prolanguo/prolanguo-common/enums";
import { DeepPartial } from "@prolanguo/prolanguo-common/extended-types";



// a Set as it exists in the database
export interface SetRow {
  readonly userId: string,
  readonly setId: string,
  readonly setName: string,
  readonly setStatus: SetStatus,
  readonly learningLanguageCode: string,
  readonly translatedToLanguageCode: string,
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly updatedStatusAt: null | Date;
  readonly firstSyncedAt: null | Date;
  readonly lastSyncedAt: null | Date;
  // readonly extraData: SetExtraDataItem[]
}

export type SetRowForInsert = Omit<SetRow, 'firstSyncedAt' | 'lastSyncedAt'>;
export type SetRowForUpdate = DeepPartial<SetRow>;