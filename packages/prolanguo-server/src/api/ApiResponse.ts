import { Response } from "express";

interface SignUpResponse {
  currentUser: object,
  accessToken: string
}

export class ApiResponse<T>{
  private res: Response;

  constructor(res: Response){
    this.res = res;
  }

  json(obj: SignUpResponse){
    return this.res.json(obj)
  }

  error(obj: { errorCode: string }){
    return this.res.status(500).json(obj)
  }
}