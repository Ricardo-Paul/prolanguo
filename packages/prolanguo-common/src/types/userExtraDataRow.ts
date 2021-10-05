enum UserExtraDataName{
  GLOBAL_AUTO_ARCHIVE = 'GLOBAL_AUTO_ARCHIVE',
  GLOBAL_REMINDER = 'GLOBAL_REMINDER'
}

interface GlobalAutoArchive {
  readonly dataName: UserExtraDataName.GLOBAL_AUTO_ARCHIVE,
  // add other fields
}

interface GlobalReminder {
  readonly dataName: UserExtraDataName.GLOBAL_REMINDER
}

export type UserExtraDataRow = | GlobalAutoArchive | GlobalReminder