import { Knex } from "knex";
import { DeepPartial } from "@prolanguo/prolanguo-common/extended-types";
import { TableName } from "../enums/tableName";
import { promisifyQuery } from "./PromisifyQuery";
import * as _ from "lodash";
import { Category, Definition, Vocabulary, VocabularyWriting } from "@prolanguo/prolanguo-common/interfaces";
import { VocabularyModelRowPreparer } from "../preparers/VocabularyRowPreparer";
import { VocabularyRow } from "../interfaces/VocabularyRow";

// models
import { VocabularyDefinitionModel } from "./VocabularyDefinitionModel";
import { VocabularyCategoryModel } from "./VocabularyCategoryModel";
import { VocabularyWritingModel } from "./VocabularyWritingModel";
import { assertExists } from "../utils/assertExists";
import * as moment from "moment";

export class VocabularyModel{
  private vocabularyModelRowPreparer: VocabularyModelRowPreparer;
  private vocabularyDefinitionModel: VocabularyDefinitionModel;
  private vocabularyCategoryModel: VocabularyCategoryModel;
  private vocabularyWritingModel: VocabularyWritingModel;

  constructor(){
    this.vocabularyModelRowPreparer = new VocabularyModelRowPreparer();
    this.vocabularyDefinitionModel = new VocabularyDefinitionModel();
    this.vocabularyCategoryModel = new VocabularyCategoryModel();
    this.vocabularyWritingModel = new VocabularyWritingModel();
  }

  public async getVocabulariesByLastSyncTime(
    db: Knex,
    userId: string,
    startAt: Date | undefined,
    softLimit: number,
    setId: string
  ): Promise<{ 
    vocabularyList: Vocabulary[];
    vocabularyIdSetIdPairs: [string, string][],
    noMore: boolean
  }>{
    return new Promise(
      async (resolve, reject): Promise<void> => {
        try{

          // first query (start time)
          let firstQueryBuilder = db 
            .select()
            .from(TableName.VOCABULARY)
            .where('userId', userId)
            .where(
              'lastSyncedAt',
              '=',
              typeof startAt === "undefined"? moment.unix(0).toDate() : startAt
            );

          if(typeof setId !== "undefined"){
            firstQueryBuilder = firstQueryBuilder.where('setId', setId);
          };
          firstQueryBuilder = firstQueryBuilder.orderBy('lastSyncedAt', 'asc');

          // second query (limit)
          let secondQueryBuilder = db 
            .select()
            .from(TableName.VOCABULARY)
            .where('userId', userId)
            .where(
              'lastSyncedAt',
              '>',
              typeof startAt === "undefined"? moment.unix(0).toDate() : startAt
            );
            if(typeof setId !== "undefined"){
              secondQueryBuilder = secondQueryBuilder.where('setId', setId);
            }
            secondQueryBuilder = secondQueryBuilder
                .orderBy('lastSyncedAt', 'asc')
                .limit(softLimit);

          const firstQuery = promisifyQuery(firstQueryBuilder);
          const secondQuery = promisifyQuery(secondQueryBuilder);

          const [firstResut, secondResult] = await Promise.all([
            firstQuery, 
            secondQuery
          ]);

          // TODO: might have to resolve these rows
          const vocabularyRows: VocabularyRow[] = _.union(firstResut, secondResult);
          const { vocabularyList } = await this.getCompleteVocabularyByRow(
            db,
            userId,
            vocabularyRows
          );
          const noMore = secondResult.length === 0;
          const vocabularyIdSetIdPairs = vocabularyRows.map((row): [string, string] => {
            return [row.vocabularyId, row.setId]
          });

          resolve({
            vocabularyList,
            vocabularyIdSetIdPairs,
            noMore
          });

        }catch(error){
          reject(error)
        }
      }
    );
  }

  public async getVocabulariesByIds(
    db: Knex,
    userId: string,
    vocabuaryIds: string[]
  ): Promise<{
    vocabularyList: Vocabulary[],
    vocabularyIdSetIdPairs: [string, string][]
  }>{
    return new Promise(async (resolve, reject): Promise<void> => {
      try{
        const result = await promisifyQuery(
          db.
          select()
          .from(TableName.VOCABULARY)
          .where('userId', userId)
          .whereIn('vocabularyId', vocabuaryIds.slice())
        );
        
          // resolve this array
          const vocabularyRows: VocabularyRow[] = result;
          // get complete vocabularies by row
          // meaning get associated definitions, category and writing.
          const { vocabularyList } = await this.getCompleteVocabularyByRow(db, userId, vocabularyRows);
          console.log("vocabulary List from get vocabularies :", vocabularyList);

          const vocabularyIdSetIdPairs = vocabularyRows.map(
            (vocabularyRow): [string, string] => {
              return [vocabularyRow.vocabularyId, vocabularyRow.setId];
            }
          );

          resolve({
            vocabularyList,
            vocabularyIdSetIdPairs
          });
        } catch(err){
        reject(err)
      }
    })
  }

  private getCompleteVocabularyByRow(
    db: Knex,
    userId: string,
    vocabularyRows: VocabularyRow[],
  ): Promise<{ vocabularyList: Vocabulary[] }>{
    return new Promise(
      async (resolve, reject): Promise<void> => {
        try{
          const vocabularyIds = vocabularyRows.map((row) => row.vocabularyId);
          // get associated vocabulary definitions using vocabulary ids
          const {
            definitionsPerVocabularyIds
          } = await this.vocabularyDefinitionModel.getDefinitionsByVocabularyIds(
            db,
            userId,
            vocabularyIds
          );

          // get associated vocabulary categories using vocabulary ids
          const { 
            categoriesPerVocabularyIds 
          } = await this.vocabularyCategoryModel.getCategoriesByVocabularyIds(
            db, 
            userId,
            vocabularyIds
          );

          // get associated vocabulary writings using vocabulary ids
          const { 
            vocabularyWritingsPerVocabularyId 
          } = await this.vocabularyWritingModel.getVocabularyWritingsByVocabularyIds(
            db,
            userId,
            vocabularyIds
          );

          const vocabularyList = vocabularyRows.map((row): Vocabulary => {
            const definitions = definitionsPerVocabularyIds[row.vocabularyId];
            const category = categoriesPerVocabularyIds[row.vocabularyId];
            const writing = vocabularyWritingsPerVocabularyId[row.vocabularyId];

            return {
              vocabularyId: row.vocabularyId,
              vocabularyText: row.vocabularyText,
              vocabularyStatus: row.vocabularyStatus,
              level: row.level,
              definitions,
              category,
              writing,
              lastLearnedAt: row.lastLearnedAt,
              createdAt: row.createdAt,
              updatedAt: row.updatedAt,
              firstSyncedAt: row.firstSyncedAt,
              lastSyncedAt: row.lastSyncedAt
            }
          });

          console.log("The vocabulary list :", vocabularyList);

        resolve({ vocabularyList })
        }catch(error){
          reject(error)
        }
      }
    );
  };

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
            )
          );

          // upsert vocabulary categories
          queries.push(
            this.vocabularyCategoryModel.upsertVocabularyCategories(
              db,
              userId,
              vocabularySetIdPairs.map(([vocabulary]): [DeepPartial<Category>, string] => {
                return [assertExists(vocabulary.category), assertExists(vocabulary.vocabularyId)]
              }).filter((pair) => {
                return pair[0] !== undefined
              })
            )
          );

          // upsert vocabulary writings
          queries.push(
            this.vocabularyWritingModel.upsertVocabularyWritings(
              db,
              userId,
              vocabularySetIdPairs.map(([vocabulary]): [DeepPartial<VocabularyWriting>, string] => {
                return [
                  assertExists(vocabulary.writing),
                  assertExists(vocabulary.vocabularyId)
                ] 
              }).filter((pair) => {
                return pair[0] !== undefined
              })
            )
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
