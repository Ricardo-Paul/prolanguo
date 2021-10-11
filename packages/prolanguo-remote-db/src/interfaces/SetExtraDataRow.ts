import { SetExtraDataName } from "@prolanguo/prolanguo-common/enums";
import { DeepPartial } from "@prolanguo/prolanguo-common/extended-types";

export interface SetExtraDataRow {
  readonly userId: string,
  readonly setId: string,
  readonly dataName: SetExtraDataName,
  readonly dataValue: string,
  readonly createdAt: null | Date;
  readonly updatedAt: null | Date;
  readonly firstSyncedAt: null | Date;
  readonly lastSyncedAt: null | Date;
}

export type SetExtraDataRowForInsert = Omit<SetExtraDataRow, 'firstSyncedAt' | 'lastSyncedAt'>
export type SetExtraDataRowForUpdate = DeepPartial<SetExtraDataRow>