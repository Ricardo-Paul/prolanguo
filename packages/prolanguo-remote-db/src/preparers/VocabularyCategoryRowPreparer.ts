import { CategoryRow, CategoryRowForUpsert } from "../interfaces/CategoryRow";
import { AbstractPreparer } from "./AbstractPreparer";
import * as Joi from "joi";
import * as _ from "lodash";
import { DeepPartial } from "@prolanguo/prolanguo-common/extended-types";
import { Category } from "@prolanguo/prolanguo-common/interfaces";

export class VocabularyCategoryRowPreparer extends AbstractPreparer<CategoryRow> {
  protected upsertRules = {
    userId: Joi.string(),
    vocabularyId: Joi.string(),
    categoryName: Joi.string(),
    createdAt: Joi.date().optional(),
    updatedAt: Joi.date().optional(),
    firstSyncedAt: Joi
      .forbidden()
      .strip()
      .optional(),
    lastSyncedAt: Joi
      .forbidden()
      .strip()
      .optional()
  };

  public prepareUpsert(
    category: Category,
    userId: string,
    vocabularyId: string
  ): CategoryRowForUpsert{
    const categoryRow =  {
      userId,
      vocabularyId,
      categoryName: category.categoryName,
      createdAt: category.createdAt,
      updatedAt: category.updatedAt,
      firstSyncedAt: category.firstSyncedAt,
      lastSyncedAt: category.lastSyncedAt
    };

    return this.validateData(categoryRow, Joi.object(this.upsertRules));
  }
}