import { Knex } from "knex";
import { Category } from "@prolanguo/prolanguo-common/interfaces";
import { DeepPartial } from "@prolanguo/prolanguo-common/extended-types";
import { VocabularyCategoryRowPreparer } from "../preparers/VocabularyCategoryRowPreparer";
import { TableName } from "../enums/tableName";
import { promisifyQuery } from "./PromisifyQuery";
import * as _ from "lodash";

export class VocabularyCategoryModel{
  private vocabularyCategoryRowPreparer: VocabularyCategoryRowPreparer;
  
  constructor(){
    this.vocabularyCategoryRowPreparer = new VocabularyCategoryRowPreparer();
  };

  public async getCategoriesByVocabularyIds(
    db: Knex,
    userId: string,
    vocabuaryIds: string[]
  ): Promise<{ categoriesPerVocabularyIds: {[P in string]: Category[]} }>{
    return new Promise(
      async (resolve, reject): Promise<void> => {
        try{
          const result = await promisifyQuery(
            db 
            .select()
            .from(TableName.VOCABULARY_CATEGORY)
            .where({
              userId
            })
            .whereIn('vocabularyId', vocabuaryIds.slice())
          );

          // resolve this array
          const categoryRows = result;
          // data structure: {string: [{}, {}], string: [{}, {}]}
          const categoryRowsPerVocabularyIds = _.groupBy(categoryRows, (row) => row.vocabularyId);

          // map over values to remove vocabularyId and userId from the records
          const categoriesPerVocabularyIds = _.mapValues(categoryRowsPerVocabularyIds, (categoryRows) => {
            return categoryRows.map((category): Category => {
              return {
                categoryName: category.categoryName,
                createdAt: category.createdAt,
                updatedAt: category.updatedAt,
                firstSyncedAt: category.firstSyncedAt,
                lastSyncedAt: category.lasySyncedAt
              }
            })
          });
        resolve({
          categoriesPerVocabularyIds
        })
        }catch(error){
          reject(error)
        }
      }
    );
  }

  public async upsertVocabularyCategories(
    db: Knex,
    userId: string,
    categoryAndVocabularyIdPairs: [
      DeepPartial<Category>, string
    ][]
  ): Promise<void>{
    return new Promise(
      async (resolve, reject): Promise<void> => {
        try{
          const queries = [];

          const categoryRows = categoryAndVocabularyIdPairs.map(([category, vocabuaryId]) => {
            return this.vocabularyCategoryRowPreparer.prepareUpsert(category as Category, userId, vocabuaryId)
          });

          // bulk insert vocabularies
          const { sql, bindings } = db
              .insert(categoryRows)
              .into(TableName.VOCABULARY_CATEGORY)
              .toSQL();

          queries.push(
            promisifyQuery(
              db.raw(
                sql.replace('insert', 'insert ignore'), bindings
              )
            )
          );

          // bulk update vocabularies
          queries.push(
            ...categoryRows.map(async (row) => {
              // remove fields we won't update
              const fieldsToUpdate = _.omit(row, ['userId', 'vocabularyId']);
              const { userId, vocabularyId } = row;
              if(!_.isEmpty(fieldsToUpdate)){
                await promisifyQuery(
                  db
                    .update(fieldsToUpdate)
                    .from(TableName.VOCABULARY_CATEGORY)
                    .where({
                      userId,
                      vocabularyId
                    })
                );
              }
            })
          );

          await Promise.all(queries);
        resolve()
        }catch(error){
          reject(error)
        }
      }
    );
  }

}