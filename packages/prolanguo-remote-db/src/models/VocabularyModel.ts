import { Knex } from "knex";
import { DeepPartial } from "@prolanguo/prolanguo-common/extended-types";
import { TableName } from "../enums/tableName";
import { promisifyQuery } from "./PromisifyQuery";
import * as _ from "lodash";
import { Definition, Vocabulary } from "@prolanguo/prolanguo-common/interfaces";
import { VocabularyModelRowPreparer } from "../preparers/VocabularyRowPreparer";
import { VocabularyDefinitionModel } from "./VocabularyDefinitionModel";

export class VocabularyModel{
  private vocabularyModelRowPreparer: VocabularyModelRowPreparer;
  private vocabularyDefinitionModel: VocabularyDefinitionModel;

  constructor(){
    this.vocabularyModelRowPreparer = new VocabularyModelRowPreparer();
    this.vocabularyDefinitionModel = new VocabularyDefinitionModel();
  }

  public async upsertMultipleVocabulary(
    db: Knex,
    userId: string,
    vocabularySetIdPairs: [
      DeepPartial<Vocabulary>, string
    ][]
  ): Promise<void>{
    return new Promise(
      async (resolve, reject): Promise<void> => {
        const queries: Promise<void[] | void>[]= [];
        console.log("vocabulary and set Id received :", vocabularySetIdPairs);

        try{
          // bulk insert vocabularies
          if(vocabularySetIdPairs.length > 0){
            queries.push(
              this.insertOrIgnoreMultipleVocabulary(
                db,
                userId,
                vocabularySetIdPairs.filter(
                  (pair): pair is [ Vocabulary, string ]  => {
                    const [ vocabulary, setId ] = pair;
                    return this.vocabularyModelRowPreparer.canBeInserted(
                      vocabulary as Vocabulary,
                      userId,
                      setId
                    )
                  }
                )
              )
            );

          // // bulk update vocabularies
          queries.push(
            this.updateVocabularies(
              db,
              userId,
              vocabularySetIdPairs
            )
          );

          // upsert VocabularyDefinition (s)
          queries.push(
            this.vocabularyDefinitionModel.upsertDefinitions(
              db,
              userId,
              _.flatMap(vocabularySetIdPairs, ([vocabulary]) => {
                if(typeof vocabulary.definitions !== 'undefined'){
                  console.log("Definition content :", vocabulary.definitions)
                  return vocabulary.definitions?.map(
                    (definition): [ DeepPartial<Definition>, string ] => [
                      definition,
                      vocabulary.vocabularyId as string
                    ]
                  )
                } else {
                  return []
                }
              })
            ) //Test Upserting Vocabularies
          );

          await Promise.all(queries)
          resolve()
        }
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
            userId,
            setId
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

          const vocabularyRow = this.vocabularyModelRowPreparer.prepareUpsert(
            vocabulary,
            setId,
            userId
          );
      
          const fieldsToUpdate = _.omit(vocabularyRow, ['vocabularyId, userId']);
          const { vocabularyId } = vocabularyRow;
      
          if(!_.isEmpty(fieldsToUpdate)){
            queries.push(
              promisifyQuery(
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

        await Promise.all(queries);
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
      Vocabulary, string
    ][]
  ): Promise<void>{
    console.log("vocabulary and set Id received for insert:", vocabularySetIdPairs);

    return new Promise(
      async (resolve, reject): Promise<void> => {
        try{
          console.log("running inserting vocabuary");
          const queries = []
          const vocabularyRows = vocabularySetIdPairs.map(
            ([vocabulary, setId]) => {
              return this.vocabularyModelRowPreparer.prepareInsert(
                vocabulary,
                userId,
                setId
              );
            }
          );

          // 
          const {sql, bindings} = db
          .insert(vocabularyRows)
          .into(TableName.VOCABULARY)
          .toSQL();

          console.log("Vocabulary Rows to insert :", vocabularyRows);
          console.log("insert queries :", sql);

        
          const replaceSql = sql.replace('insert', 'insert ignore');

          // bulk insert all rows
          queries.push(
            await promisifyQuery(
              db.raw(
                replaceSql, bindings
              )
            )
          );

          await Promise.all(queries);
          resolve()
        //
        }catch(error){
          reject(error)
        }
      }
    );
  }
};
