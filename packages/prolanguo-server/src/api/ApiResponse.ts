import { Response } from "express";


export class ApiResponse<T>{
  private res: Response;

  constructor(res: Response){
    this.res = res;
  }

  json(obj: T){
    return this.res.json(obj)
  }

  error(code: number, obj: { errorCode: string }){
    return this.res.status(code).json(obj)
  }
}