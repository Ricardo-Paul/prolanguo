export interface UserExtraDataRow {
  userId: string;
  dataName: string;
  dataValue: string;
  createdAt: Date;
  updatedAt: Date;
  firstSyncedAt: Date;
  lastSyncedAt: Date;
}