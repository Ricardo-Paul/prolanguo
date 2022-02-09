import { SetStatus } from "@prolanguo/prolanguo-common/enums";
import { DeepPartial } from "@prolanguo/prolanguo-common/extended-types";



// Set fields as they exist in the table
export interface SetRow {
  readonly userId: string,
  readonly setId: string,
  readonly setName: string,
  readonly setStatus: SetStatus,
  readonly learningLanguageCode: string,
  readonly translatedLanguageCode: string,
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly updatedStatusAt: null | Date;
  readonly firstSyncedAt: null | Date;
  readonly lastSyncedAt: null | Date;
}

export type SetRowForInsert = Omit<SetRow, 'firstSyncedAt' | 'lastSyncedAt'>;
export type SetRowForUpdate = DeepPartial<SetRow>;