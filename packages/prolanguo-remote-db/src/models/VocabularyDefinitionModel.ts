import { Knex } from "knex";
import { Definition } from "@prolanguo/prolanguo-common/interfaces";
import { DeepPartial } from "@prolanguo/prolanguo-common/extended-types";

export class VocabularyDefinitionModel{
  public upsertDefinitions(
    db: Knex,
    userId: string,
    definitionAndVocabularyIdPairs: [
      DeepPartial<Definition>,
      string | null
    ][]
  ): Promise<void>{
    return new Promise(
      async (resolve, reject): Promise<void> => {
        try{
          const queries = [];
          const definitionRows = definitionAndVocabularyIdPairs.map(
            // TODO: replace by a row preparer
            (row) => {
              
            }
          )
        resolve()
        }catch(error){
          reject(error)
        }
      }
    );
  }
}