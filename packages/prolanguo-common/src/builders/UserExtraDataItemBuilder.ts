import * as _ from "lodash";
import * as moment from "moment";
import { DeepPartial } from "../extended-types";
import { UserExtraDataItem } from "../types/UserExtraDataItem";

export class UserExtraDataItemBuilder {
  public build(userExtraDataItem: DeepPartial<UserExtraDataItem>): UserExtraDataItem{

    return _.merge({
      dataName: "",
      dataValue: "",
      createdAt: moment.utc().toDate(),
      updatedAt: moment.utc().toDate(),
      firstSyncedAt: null,
      lastSyncedAt: null
    }, 
    userExtraDataItem
    );
  }
};

// test
// const userExtra = new UserExtraDataItemBuilder().build(
//   {
//     dataName: "GLOBAL_AUTO_ARCHIVE",
//     dataValue: {
//       globalAutoArchiveEnabled: true,
//       spaceRepetitionThreshold: 4,
//     },
//     firstSyncedAt: moment.utc().toDate()
//   }
// )

// console.log(userExtra);