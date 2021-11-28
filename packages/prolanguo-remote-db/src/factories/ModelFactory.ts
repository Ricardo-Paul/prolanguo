import { UserModel } from "../models/UserModel";
import { ModelList } from "../interfaces/ModelList";
import { SetModel } from "../models/SetModel";
import { VocabularyModel } from "../models/VocabularyModel";
import { VocabularyDefinitionModel } from "../models/VocabularyDefinitionModel";

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
      model = new VocabularyModel
    } else if(modelName === 'vocabularyDefinitionModel'){
      model = new VocabularyDefinitionModel
    } else {
      throw new Error('Model nane not exised');
    }

    return model as ModelList[K]
  }
}