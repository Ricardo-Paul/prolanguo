import { UserModel } from "../models/UserModel";
import { ModelList } from "../interfaces/ModelList";
import { SetModel } from "../models/SetModel";
import { VocabularyModel } from "../models/VocabularyModel";
import { VocabularyDefinitionModel } from "../models/VocabularyDefinitionModel";
import { VocabularyCategoryModel } from "../models/VocabularyCategoryModel";

export class ModelFactory{
  public createAllModels(){
    return {
      userModel: this.createModel('userModel'),
      setModel: this.createModel('userModel')
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
    } else if( modelName === 'vocabularyCategoryModel'){
      model = new VocabularyCategoryModel()
    } else {
      throw new Error('Model nane not exised');
    }

    return model as ModelList[K]
  }
}