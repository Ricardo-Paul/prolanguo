import { Knex } from "knex";
import { LessonResult } from "@prolanguo/prolanguo-common/interfaces";
import { promisifyQuery } from "./PromisifyQuery";
import { LessonResultRowPreparer } from "../preparers/LessonResultRowPreparer";
import { TableName } from "../enums/tableName";

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
  }
};