// will move afterwards
import { UserMembership, UserStatus } from "@prolanguo/prolanguo-common/enums";
import { UserExtraDataRow } from './UserExtraDataRow';

// complete User representation in the program with extra data
// without sensitive fileds (password, shardId, accessKey)
export interface User {
  readonly userId: string;
  readonly email: string;
  readonly userStatus: UserStatus;

  readonly membership: UserMembership;
  readonly membershipExpiredAt: null | Date;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly firstSyncedAt: null | Date;
  readonly lastSyncedAt: null | Date;
  readonly extraData: UserExtraDataRow[] //add array type
}

// User fields as exists in the database
export interface UserRow {
  readonly shardId: number;
  readonly accessKey: string;
  readonly password: string;
  readonly userId: string;
  readonly email: string;
  readonly userStatus: UserStatus;

  readonly membership: UserMembership;
  readonly membershipExpiredAt: null | Date;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly firstSyncedAt: null | Date;
  readonly lastSyncedAt: null | Date;
  // no extra data
}