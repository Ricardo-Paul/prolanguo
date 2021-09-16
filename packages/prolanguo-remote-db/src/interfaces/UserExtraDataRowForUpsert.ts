// data value will be a union type
// with deeper level
// deep partial will be used 
export interface UserExtraDataRowForUpsert {
  userId: string;
  dataName: string;
  dataValue: string;
  createdAt: Date;
  updatedAt: Date;
  firstSyncedAt: null | Date;
  lastSyncedAt: null | Date;
}