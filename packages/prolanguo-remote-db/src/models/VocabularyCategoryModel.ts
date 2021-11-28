import { Knex } from "knex";
import { Category } from "@prolanguo/prolanguo-common/interfaces";
import { DeepPartial } from "@prolanguo/prolanguo-common/extended-types";
import { VocabularyCategoryRowPreparer } from "../preparers/VocabularyCategoryRowPreparer";

export class VocabularyCategoryModel{
  private vocabularyCategoryRowPreparer: VocabularyCategoryRowPreparer;
  
  constructor(){
    this.vocabularyCategoryRowPreparer = new VocabularyCategoryRowPreparer();
  };

  public async upsertVocabularyCategories(
    db: Knex,
    userId: string,
    categoryAndVocabularyIdPairs: [
      DeepPartial<Category>, string
    ][]
  ): Promise<void>{
    return new Promise(
      async (resolve, reject): Promise<void> => {
        try{
          const categoryRows = categoryAndVocabularyIdPairs.map(([category, vocabuaryId]) => {
            return this.vocabularyCategoryRowPreparer.prepareUpsert(category as Category, userId, vocabuaryId)
          });

          console.log("Category Rows :", categoryRows);
        resolve()
        }catch(error){
          reject(error)
        }
      }
    );
  }

  public async getVocabularyCategoriesByIds(){
    
  }

}