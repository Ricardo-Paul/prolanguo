// data value will be a union type
// with deeper level
// deep partial will be used 

export interface UserExtraDataRow {
  userId: string;
  dataName: string;
  dataValue: string;
  createdAt: Date;
  updatedAt: Date;
  firstSyncedAt: Date;
  lastSyncedAt: Date;
}

// TODO: refactor, omit firstSyncedAt and lastsyncedAt for the upsert Row
// using UserExtraDataRow
export interface UserExtraDataRowForUpsert {
  userId: string;
  dataName: string;
  dataValue: string;
  createdAt: Date;
  updatedAt: Date;
}