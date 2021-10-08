import { UserExtraDataItemBuilder } from "./UserExtraDataItemBuilder";
import { User } from "../interfaces/general/User";
import * as _ from "lodash";
import * as moment from "moment";
import * as uuid from "uuid";
import { UserMembership, UserStatus } from "../enums";
import { UserExtraDataItem } from "../types/UserExtraDataItem";
import { DeepPartial } from "../extended-types";
import { assertExists } from "../assert/assertExists";


export class UserBuilder {
  public build(user: DeepPartial<User>): User{
    let extraData: UserExtraDataItem[] = [];

    if(typeof user.extraData !== 'undefined'){
      extraData = user.extraData.map((extraDataItem): UserExtraDataItem => {
        return new UserExtraDataItemBuilder().build(
          assertExists(extraDataItem)
        );
      });
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

// testing deePartial Type
const u = {name: "paul", occ: { job: "Dev", salary: 3000 }};
const uPartial: DeepPartial<typeof u> = {
  name: "eric",
  occ: {
    job: "Tester",
  }
}