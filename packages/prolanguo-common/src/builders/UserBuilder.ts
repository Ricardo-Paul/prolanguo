import { UserExtraDataItemBuilder } from "./UserExtraDataItemBuilder";
import { User } from "../interfaces/general/User";
import * as _ from "lodash";
import * as moment from "moment";
import * as uuid from "uuid";
import { UserMembership, UserStatus } from "../enums";
import { UserExtraDataItem } from "./UserExtraDataItemBuilder"

export class UserBuilder {
  public build(user: Partial<User>): User{
    let extraData: UserExtraDataItem[] = [];
    if(user.extraData !== undefined && user.extraData.length > 0){
      extraData = user.extraData.map((extraDataItem): UserExtraDataItem => {
        return new UserExtraDataItemBuilder().build(
          extraDataItem
        )
      })
    }

    return _.merge({
      userId: uuid.v4(),
      email: "",
      userStatus: UserStatus.ACTIVE,
      membership: UserMembership.REGULAR,
      membershipExpiredAt: null,
      createdAt: moment.utc().toDate(),
      updatedAt: moment.utc().toDate(),
      firstSyncedAt: null,
      lastSyncedAt: null,
      extraData
    },
    user
  )
  }
}