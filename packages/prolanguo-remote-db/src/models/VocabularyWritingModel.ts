import { Knex } from "knex";
import { VocabularyWriting } from "@prolanguo/prolanguo-common/interfaces";
import { DeepPartial } from "@prolanguo/prolanguo-common/extended-types";
import { VocabularyWritingRowPreparer } from "../preparers/VocabularyWritingRowPreparer";
import { TableName } from "../enums/tableName";
import { promisifyQuery } from "./PromisifyQuery";
import * as _ from "lodash";

export class VocabularyWritingModel{
  private vocabularyWritingRowPreparer: VocabularyWritingRowPreparer;

  constructor(){
    this.vocabularyWritingRowPreparer = new VocabularyWritingRowPreparer();
  }
  public async upsertVocabularyWritings(
    db: Knex,
    userId: string,
    writingAndVocabularyIdPairs: [
      DeepPartial<VocabularyWriting>, string
    ][]
  ): Promise<void>{
    return new Promise(
      async (resolve, reject): Promise<void> => {
        try{
          const queries = [];

          const vocabularyWritingRows = writingAndVocabularyIdPairs.map(
            ([vocabularyWriting, vocabularyId]) => {
              return this.vocabularyWritingRowPreparer.prepareUpsert(
                vocabularyWriting as VocabularyWriting,
                userId,
                vocabularyId
              )
          });

          // bulk insert vocabulary writings
          const {sql, bindings} = db
            .insert(vocabularyWritingRows)
            .into(TableName.VOCABULARY_WRITING)
            .toSQL();

          queries.push(
            await promisifyQuery(
              db.raw(
                sql.replace('insert', 'insert ignore'), bindings
              )
            )
          );

          // bulk update vocabulary writings
          queries.push(
            ...vocabularyWritingRows.map(async (row) => {
              const fieldsToUpdate = _.omit(row, ['userId', 'vocabularyId']);
              const { userId, vocabularyId } = row;
              if(!_.isEmpty(fieldsToUpdate)){
                await promisifyQuery(
                  db
                  .update(fieldsToUpdate)
                  .from(TableName.VOCABULARY_WRITING)
                  .where({
                    userId,
                    vocabularyId
                  })
                )
              };
            })
          );

        await Promise.all(queries);
        resolve()
        }catch(error){
          reject(error)
        }
      }
    );
  };

  public async getVocabularyWritingsByIds(){
    
  }
};