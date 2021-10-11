import { UserModel } from "../models/UserModel";
import { ModelList } from "../interfaces/ModelList";
import { SetModel } from "../models/SetModel";

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
    } else {
      throw new Error('Model nane is not existed')
    }

    return model as ModelList[K]
  }
}