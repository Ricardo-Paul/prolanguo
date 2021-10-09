import { SetStatus } from "../../enums/SetStatus";

enum SetExtraDataName{
  SPACED_REPETITION_MAX_LIMIT = 'spacedRepetiontionMaxLimit'
}

interface SpacedRepetiontionMaxLimit{
  readonly dataName: SetExtraDataName.SPACED_REPETITION_MAX_LIMIT,
  readonly dataValue: number,
  readonly createdAt: Date,
  readonly updatedAt: Date,
  readonly firstSyncedAt: Date,
  readonly lastSyncedAt: Date
}

interface OtherItems{

}

type SetExtraDataItem = SpacedRepetiontionMaxLimit | OtherItems

export interface Set {
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
  readonly extraData: SetExtraDataItem[]
}