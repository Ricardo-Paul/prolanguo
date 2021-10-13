import { Knex } from "knex";
import { DeepPartial } from "@prolanguo/prolanguo-common/extended-types";
import { TableName } from "../enums/tableName";
import { promisifyQuery } from "./PromisifyQuery";
import * as _ from "lodash";
import { Vocabulary } from "@prolanguo/prolanguo-common/interfaces";

export class VocabularyModel{
  public async upserMultipleVocabulary(
    db: Knex,
    userId: string,
    vocabularySetIdPairs: [
      DeepPartial<Vocabulary>, string
    ][]
  ): Promise<void>{
    return new Promise(
      async (resolve, reject): Promise<void> => {
        const queries = [];

        try{
          // bulk insert vocabularies
          if(vocabularySetIdPairs.length > 0){
            queries.push(
              this.insertOrIgnoreMultipleVocabulary(
                db,
                userId,
                vocabularySetIdPairs.filter(
                  ([Vocabulary, setId]) => {
                    return this.vocabularyModelRowPreparer.canBeInserted(
                      Vocabulary,
                      setId,
                      userId
                    )
                  }
                )
              )
            );

          // bulk update vocabularies
          queries.push(
            this.updateVocabularies(
              db,
              userId,
              vocabularySetIdPairs
            )
          );
        }
        resolve()
        }catch(error){
          reject(error)
        }
      }
    );
  };

  private async updateVocabularies(
    db: Knex,
    userId: string,
    vocabularySetIdPairs: [
      DeepPartial<Vocabulary>, string
    ][]
  ): Promise<void[]>{
    return Promise.all(
      vocabularySetIdPairs.map(
        ([vocabulary, setId]) => {
          return this.updateVocabulary(
            db,
            vocabulary,
            setId,
            userId
          )
        }
      )
    );
  }

  private async updateVocabulary(
    db: Knex,
    vocabulary: DeepPartial<Vocabulary>,
    setId: string,
    userId: string
  ): Promise<void> {
    return new Promise(
      async (resolve, reject): Promise<void> => {
        try{
          const queries = [];

          const vocabularyRows = this.vocabularyModelRowPreparer.prepareUpdate(
            vocabulary,
            setId,
            userId
          );
      
          const fieldsToUpdate = _.omit(vocabularyRows, ['vocabularyId, userId']);
          const { vocabularyId } = vocabularyRows;
      
          if(!_.isEmpty(fieldsToUpdate)){
            queries.push(
              await promisifyQuery(
                db
                .update(fieldsToUpdate)
                .from(TableName.VOCABULARY)
                .where({
                  vocabularyId,
                  userId
                })
              )
            );
          };
          
        resolve()
        }catch(error){
          reject(error)
        }
      }
    );
  }

  private async insertOrIgnoreMultipleVocabulary(
    db: Knex,
    userId: string,
    vocabularySetIdPairs: [
      DeepPartial<Vocabulary>, string
    ][]
  ): Promise<void>{
    return new Promise(
      async (resolve, reject): Promise<void> => {
        try{
          const queries = []
          const vocabularyRows = vocabularySetIdPairs.map(
            ([vocabulary, setId]) => {
              return this.vocabularyModelRowPreparer.prepareInsert(
                vocabulary,
                setId,
                userId
              )
            }
          );

          const { sql, bindings } = db
            .insert(vocabularyRows)
            .into(TableName.VOCABULARY)
            .toSQL();

          queries.push(
            await promisifyQuery(
              db.raw(
                sql.replace('insert', 'insert ignore'), 
                bindings
              )
            )
          );

        Promise.all(queries);
        resolve()
        }catch(error){
          reject(error)
        }
      }
    );
  }
}