import { UserModel } from "../models/UserModel";
import { ModelList } from "../interfaces/ModelList";
import { SetModel } from "../models/SetModel";
import { VocabularyModel } from "../models/VocabularyModel";
import { VocabularyDefinitionModel } from "../models/VocabularyDefinitionModel";
import { VocabularyCategoryModel } from "../models/VocabularyCategoryModel";
import { VocabularyWritingModel } from "../models/VocabularyWritingModel";


export class ModelFactory{
  public createAllModels(){
    return {
      userModel: this.createModel('userModel'),
      setModel: this.createModel('setModel'),
      VocabularyModel: this.createModel('vocabularyModel'),
      // finish createing models
    }
  }

  public createModel<K extends keyof ModelList>(modelName: K): ModelList[K]{
    let model;
    if(modelName === 'userModel'){
      model = new UserModel();
    } else if(modelName === 'setModel') {
      model = new SetModel()
    } else if(modelName === 'vocabularyModel'){
      model = new VocabularyModel()
    } else if(modelName === 'vocabularyDefinitionModel'){
      model = new VocabularyDefinitionModel()
    } else if(modelName === 'vocabularyCategoryModel'){
      model = new VocabularyCategoryModel()
    } else if(modelName === 'vocabularyWritingModel'){
      model = new VocabularyWritingModel()
    } else {
      throw new Error('Model nane not exised');
    };

    return model as ModelList[K]
  }
}