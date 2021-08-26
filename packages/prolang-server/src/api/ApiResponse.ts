import { Response } from "express"

export class ApiResponse<T>{
  private res: Response;

  constructor(res: Response){
    this.res = res;
  }

  json(obj: { currentUser: object, accessToken: string}){
    return this.res.json(obj)
  }
}