import { SetExtraDataName } from "../enums/SetExtraDataName";
import { SpacedRepetiontionMaxLimit } from "./../interfaces/general/SpacedRepetitionMaxLimit";

interface OtherInterface{
  readonly dataName: SetExtraDataName.SPACED_REPETITION_MAX_LIMIT,
  readonly dataValue: string,
  readonly createdAt: Date,
  readonly updatedAt: Date,
  readonly firstSyncedAt: Date,
  readonly lastSyncedAt: Date
}

export type SetExtraDataItem = SpacedRepetiontionMaxLimit | OtherInterface
 