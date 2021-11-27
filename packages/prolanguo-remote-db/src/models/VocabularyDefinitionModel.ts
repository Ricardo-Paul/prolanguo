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
          const definitionRows = definitionAndVocabularyIdPairs.map(
            ([definition, vocabularyId]) => this.vocabularyDefinitionRowPreparer.prepareInsert(
              definition as Definition,
              vocabularyId,
              userId
            )
          );

          // bulk insert definitions
          const {
            sql, bindings
          } = 
           db
           .insert(definitionRows)
           .into(TableName.DEFINITION)
           .toSQL();

          queries.push(
            await promisifyQuery(
              db.raw(
                sql.replace('insert', 'insert ignore'), bindings
              )
            )
          );

          // bulk update definitions
          queries.push(
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

        Promise.all(queries)
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
          const definitionRow = this.vocabularyDefinitionRowPreparer.prepareUpdate(
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
}