import * as _ from "lodash";
import * as moment from "moment";

interface UserExtraDataItem {
  readonly dataName: string,
  readonly dataValue: object,
  readonly createdAt: Date,
  readonly updatedAt: Date,
  readonly firstSyncedAt: Date,
  readonly lastSyncedAt: Date
}

export class UserExtraDataItemBuilder {
  public build(userExtraDataItem: Partial<UserExtraDataItem>): UserExtraDataItem{

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

const userExtra = new UserExtraDataItemBuilder().build(
  {
    dataName: "GLOBAL_AUTO_ARCHIVE",
    dataValue: {
      globalAutoArchiveEnabled: true,
      spaceRepetitionThreshold: 4,
    },
    firstSyncedAt: moment.utc().toDate()
  }
)

console.log(userExtra);