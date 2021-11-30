import { AbstractPreparer } from "./AbstractPreparer";
import { LessonResult } from "@prolanguo/prolanguo-common/interfaces";
import { LessonType } from "@prolanguo/prolanguo-common/enums";
import * as Joi from "joi";
import * as _ from "lodash";

export class LessonResultRowPreparer extends AbstractPreparer<LessonResult> {
  protected insertRules = {
    userId: Joi.string(),
    setId: Joi.string(),
    lessonResultId: Joi.string(),
    lessonType: Joi.string().valid(..._.values(LessonType)),
    poorCount: Joi.number(),
    fairCount: Joi.number(),
    goodCount: Joi.number(),
    greatCount: Joi.number(),
    superbCount: Joi.number(),
    totalCount: Joi.number(),
    createdAt: Joi.date(),
  }
}