import { UserExtraDataName } from "@prolanguo/prolanguo-common/enums"

export interface UserExtraDataRow {
  userId: string;
  dataName: UserExtraDataName;
  dataValue: string;
  createdAt: Date;
  updatedAt: Date;
  firstSyncedAt: Date;
  lastSyncedAt: Date;
}