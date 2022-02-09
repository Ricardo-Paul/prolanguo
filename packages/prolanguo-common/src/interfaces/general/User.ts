import { UserMembership } from "../../enums/UserMemberships";
import { UserStatus } from "../../enums/UserStatus";
import { UserExtraDataItem } from "../../types/UserExtraDataItem";

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
  readonly extraData: UserExtraDataItem[]
}