import { Knex } from "knex";
import { LessonResult } from "@prolanguo/prolanguo-common/interfaces";
import { promisifyQuery } from "./PromisifyQuery";
import { LessonResultRowPreparer } from "../preparers/LessonResultRowPreparer";
import { TableName } from "../enums/tableName";
import * as moment from "moment";
import * as _ from "lodash";

export class LessonResultModel{
  private lessonResultRowPreparer: LessonResultRowPreparer;
  constructor(){
    this.lessonResultRowPreparer = new LessonResultRowPreparer();
  };

  public async insertOrIgnoreLessonResults(
    db: Knex,
    userId: string,
    lessonResults: readonly LessonResult[]
  ): Promise<void>{
    return new Promise(
      async (resolve, reject): Promise<void> => {
        try{
          const queries = [];
          const lessonResultRows = lessonResults.map((lessonResult) => {
            return this.lessonResultRowPreparer.prepareInsert(
              userId,
              lessonResult
            )
          });

          const {sql, bindings} = db.insert(lessonResultRows)
            .into(TableName.LESSON_RESULT)
            .toSQL();

          queries.push(
            await promisifyQuery(
              db
              .raw(
                sql.replace('insert', 'insert ignore'),
                bindings
              )
            )
          );

        await Promise.all(queries)
        resolve()
        }catch(error){
          reject(error)
        }
      }
    );
  };

  public async getTotalCountsPerDay(
    db: Knex,
    userId: string,
    beforeDate: Date
  ): Promise<[Date, number][]>{
    return new Promise(
      async (resolve, reject): Promise<void> => {
        try{
          const results: {date: Date, count: number}[] = await promisifyQuery(
            db
            .select(
              db.raw('DATE(createdAt) AS date, SUM(totalCount) AS count')
            )
            .from(TableName.LESSON_RESULT)
            .where({userId})
            .where('createdAt', '<', beforeDate)
            .groupByRaw('DATE(createdAt)')
            .orderByRaw('DATE(createdAt)')
          );

        resolve(
          results.map((row): [Date, number] => {
            return [row.date, row.count]
          })
        );

        }catch(error){
          reject(error)
        }
      }
    );
  };

  public async getHeatMapData(
    db: Knex,
    userId: string,
    range: [Date, Date]
  ): Promise<(number | null)[]>{
    return new Promise(
      async (resolve, reject): Promise<void> => {
        try{
          const results: { date: Date, count: number }[] = await promisifyQuery(
            db
            .select(
              db.raw('DATE(createdAt) as date, SUM(totalCount) as count')
            )
            .from(TableName.LESSON_RESULT)
            .where('userId', userId)
            .whereBetween('createdAt', range)
            .groupByRaw('DATE(createdAt)')
            // .orderByRaw('DATE(createdAt)')
          );

          // we'll use this for lookup
          // data format: Map(3) {12/01/2021 => 14, 12/02/2021 => 28, 12/03/2021 => 42}
          const dateCountMap = new Map(
            results.map((row): [string, number] => {
              return [moment(row.date).format('L'), row.count]
            })
          );

          // figure out days difference between the dates
          const [start, end] = range;
          const daysDiff = moment(end).diff(moment(start), 'days') + 1;
          // 

          // say we have 10 days: (10) [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
          const days = _.range(0, daysDiff);

          // starting from [start] 
          // add each day to [start]
          // refornat the date to match our map key (12/01/2021)
          // perform a lookup to find the count for each date, return 0 if not found.
          const data = days.map((day): number => {
            return (
              dateCountMap.get(
                moment(start)
                .add(day, 'days')
                .format('L')
              )
            ) || 0
          });

        resolve(data);
        }catch(error){
          reject(error)
        }
      }
    );
  }
};