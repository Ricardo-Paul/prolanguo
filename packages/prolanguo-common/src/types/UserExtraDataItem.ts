import { UserExtraDataName } from "../enums/UserExtraDataName"


// That's a UserExtraDataRow
interface GlobalAutoArchive {
  readonly dataName: UserExtraDataName.GLOBAL_AUTO_ARCHIVE,
  readonly dataValue: {},
  readonly createdAt: Date,
  readonly updatedAt: Date,
  readonly firstSyncedAt: Date,
  readonly lastSyncedAt: Date
}

// That's a UserExtraDataRow
interface GlobalReminder {
  readonly dataName: UserExtraDataName.GLOBAL_REMINDER
}

// An item can be one or many rows ==> extraData: ExtraDataItem[]
export type UserExtraDataItem = GlobalAutoArchive | GlobalReminder