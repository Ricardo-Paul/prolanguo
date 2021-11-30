import { LessonResult } from "../interfaces";
import { DeepPartial } from "../extended-types";
import { LessonType } from "../enums";
import * as _ from "lodash";
import * as uuid from "uuid";
import moment from "moment";

export class LessonResultBuilder{
  public build(lessonResult: DeepPartial<LessonResult>): LessonResult{
    return _.merge({
      lessonResultId: uuid.v4(),
      setId: uuid.v4(),
      lessonType: LessonType.SPACED_REPETITION,
      poorCount: 0,
      fairCount: 0,
      goodCount: 0,
      greatCount: 0,
      superbCount: 0,
      totalCount: 0,
      createdAt: moment().toDate()
    }, lessonResult)
  }
}