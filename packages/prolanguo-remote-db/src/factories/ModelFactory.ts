import { string } from "joi";
import { UserModel } from "../models/UserModel";

enum ModelList{
  userModel = 'UserModel'
}

interface Model {
  UserModel: UserModel
}

// rewrite this more elangtly
export class ModelFactory{
  public makeModel(model: string){
    switch(model){
      case ModelList.userModel:
        return new UserModel
      default:
        return model
    }
  }
}
