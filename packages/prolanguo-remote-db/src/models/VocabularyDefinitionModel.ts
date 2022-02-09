import { Knex } from "knex";
import { Definition } from "@prolanguo/prolanguo-common/interfaces";
import { DeepPartial } from "@prolanguo/prolanguo-common/extended-types";
import { VocabularyDefinitionRowPreparer } from "../preparers/VocabularyDefinitionRowPreparer";
import { TableName } from "../enums/tableName";
import { promisifyQuery } from "./PromisifyQuery";
import * as _ from "lodash";

export class VocabularyDefinitionModel{
  private vocabularyDefinitionRowPreparer: VocabularyDefinitionRowPreparer;

  constructor(){
    this.vocabularyDefinitionRowPreparer = new VocabularyDefinitionRowPreparer();
  }

  public async getDefinitionsByVocabularyIds(
    db: Knex,
    userId: string,
    vocabularyIds: string[]
  ): Promise<{ definitionsPerVocabularyIds: {[P in string]: Definition[]} }>{
    return new Promise(
      async (resolve, reject): Promise<void> => {
        try{
          const result = await promisifyQuery(
            db
            .select()
            .from(TableName.DEFINITION)
            .where({userId})
            .whereIn('vocabularyId', vocabularyIds.slice())
          );

            // resolve the result array
          const definitionRows = result;

          // data structure: {string: [{}], string: [{}]}
          // values are arrays of objects
          const definitionRowsPerVocabularyIds = _.groupBy(
            definitionRows, (row) => row.vocabularyId
          );
          const definitionsPerVocabularyIds = _.mapValues(definitionRowsPerVocabularyIds, (definitionRows) => {
            return definitionRows.map((definition): Definition => {
              return {
                ...definition,
                wordClasses: JSON.parse(definition.wordclasses), //wordclasses array were stored as a json string
                // extraData: []
              }
            })
          });

        resolve({
          definitionsPerVocabularyIds
        })
        }catch(error){
          reject(error)
        }
      }
    );
  };;

  public upsertDefinitions(
    db: Knex,
    userId: string,
    definitionAndVocabularyIdPairs: [
      DeepPartial<Definition>,
      string
    ][]
  ): Promise<void>{
    return new Promise(
      async (resolve, reject): Promise<void> => {
        try{
          const queries = [];
          console.log("User id for definition :", userId);
          const definitionRows = definitionAndVocabularyIdPairs.map(
            ([definition, vocabularyId]) => {
              console.log("Definition as received :", definition);
              return this.vocabularyDefinitionRowPreparer.prepareUpsert(
                definition as Definition,
                vocabularyId,
                userId
              )
            }
          );
          console.log("Definition Row :", definitionRows);

          // bulk insert definitions
           const {sql, bindings} = db
           .insert(definitionRows)
           .into(TableName.DEFINITION)
           .toSQL();
          console.log("SQL line :", sql);

          queries.push(
            await promisifyQuery(
              db.raw(
                sql.replace('insert', 'insert ignore'), bindings
              )
            )
          );

          // bulk update definitions
          queries.push(
            // spread an array of promise inside queries
            ...definitionAndVocabularyIdPairs.map(
              ([definition, vocabularyId]) => {
                this.updateDefinition(
                  definition,
                  vocabularyId,
                  userId,
                  db
                )
              }
            )
          );

        await Promise.all(queries);
        resolve()
        }catch(error){
          reject(error)
        }
      }
    );
  }

  private updateDefinition(
    definition: DeepPartial<Definition>,
    vocabularyId: string,
    userId: string,
    db: Knex
  ): Promise<void>{
    return new Promise(
      async (resolve, reject): Promise<void> => {
        const queries = [];
        try{
          // prepare definition row for update
          const definitionRow = this.vocabularyDefinitionRowPreparer.prepareUpsert(
            definition as Definition, vocabularyId, userId
          );

          const fieldsToUpdate = _.omit(definitionRow, 'definitionId, vocabularyId, userId');
          const { definitionId } = definitionRow;

          queries.push(
            await promisifyQuery(
              db.update(fieldsToUpdate)
              .table(TableName.DEFINITION)
              .where({
                userId,
                vocabularyId,
                definitionId
              })
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
};