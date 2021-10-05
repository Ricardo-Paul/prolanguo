import { Knex } from "knex";

export function promisifyQuery(query: Knex.QueryBuilder | Knex.Raw ): Promise<any> {
  return new Promise((resolve, reject): void=> {
    query.then(resolve, reject)
  })
}