import { Category } from "../interfaces";
import { DeepPartial } from "../extended-types";
import * as _ from "lodash";
import * as moment from "moment";

export class VocabularyCategoryBuilder{
  public build(category: DeepPartial<Category>): Category{
    return _.merge({
      categoryName: 'Commercial English',
      createdAt: moment.utc().toDate(),
      updatedAt: moment.utc().toDate(),
      firstSyncedAt: null,
      lastSyncedAt: null
    }, category)
  }
}

// readonly categoryName: string,
// readonly createdAt: Date;
// readonly updatedAt: Date;
// readonly firstSyncedAt: null | Date;
// readonly lastSyncedAt: null | Date;