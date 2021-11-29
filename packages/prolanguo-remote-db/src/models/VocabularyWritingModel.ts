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

  public async getVocabularyWritingsByVocabularyIds(
    db: Knex,
    userId: string,
    vocabularyIds: string[]
  ): Promise<{ vocabularyWritingsPerVocabularyId: {[P in string]: VocabularyWriting} }>{
    return new Promise(
      async (resolve, reject): Promise<void> => {
        try{
          const result = await promisifyQuery(
            db 
            .select()
            .from(TableName.VOCABULARY_WRITING)
            .where({userId})
            .whereIn('vocabularyId', vocabularyIds)
          );

          // resolve this array
          const vocabularyWritingRows = result;
          const vocabularyWritingRowsAndVocabularyId = _.fromPairs(vocabularyWritingRows.map((row: any): [string, VocabularyWriting] => {
            return [row.vocabularyId, row]
          }));

          const vocabularyWritingsPerVocabularyId = _.mapValues(vocabularyWritingRowsAndVocabularyId, (v: any) => {
            return {
              level: v.level,
              lastWrittenAt: v.lastWrittenAt,
              disabled: v.disabled,
              createdAt: v.createdAt,
              updatedAt: v.updatedAt,
              firstSyncedAt: v.firstSyncedAt,
              lastSyncedAt: v.lastSyncedAt
            }
          });

        resolve({
          vocabularyWritingsPerVocabularyId
        });
        }catch(error){
          reject(error)
        }
      }
    );
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
};