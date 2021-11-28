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

  public async getVocabularyCategoriesByIds(){

  }

}