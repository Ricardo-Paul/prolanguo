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
    userExtraDataItem as UserExtraDataItem
    );
  }
};

// add as UserExtraDataItem, the compiler was complaining for adding trigger in themeSettings for GlobalTheme extra data
