import { UserMembership } from "../../enums/UserMemberships";
import { UserStatus } from "../../enums/UserStatus";
import { UserExtraDataRow } from "../../types/userExtraDataRow";

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