import { SetStatus } from "../../enums/SetStatus";
import { SetExtraDataItem } from "../../types/SetExtraDataItem";


export interface Set {
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
  readonly extraData: SetExtraDataItem[]
}