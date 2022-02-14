import { SetExtraDataName } from "../../enums";

export interface SpacedRepetiontionMaxLimit{
    readonly dataName: SetExtraDataName.SPACED_REPETITION_MAX_LIMIT,
    readonly dataValue: number,
    readonly createdAt: Date,
    readonly updatedAt: Date,
    readonly firstSyncedAt: Date,
    readonly lastSyncedAt: Date
}