import { UserModel } from "../models/UserModel";
import { ModelList } from "../interfaces/ModelList";

export class ModelFactory{
  public createAllModels(): ModelList{
    return {
      userModel: this.createModel('userModel')
    }
  }

  public createModel<K extends keyof ModelList>(model: K): ModelList[K]{
    switch(model){
      case 'userModel':
        return new UserModel();
      default:
        throw new Error(`Model ${model} is not existed`);
    }
  }
};