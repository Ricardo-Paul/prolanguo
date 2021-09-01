import Joi = require("joi");
import { RequestResolver } from "@prolanguo/prolanguo-common/resolvers";
import { ApiRequest } from "../ApiRequest";
import { ApiResponse } from "../ApiResponse";
import { ApiController } from "./ApiController";

interface SignInRequest {
  readonly path: string;
  readonly method: "get" | "post";
  readonly authRequired: boolean;
  readonly query: object | null;
  readonly body: null | object;
}

interface SignInResponse {
  
}

class SignInRequestResolver extends RequestResolver<SignInRequest> {
  protected rules = {
    query: Joi.string().strip(),
    body: {
      email: Joi.string().email(),
      password: Joi.string(),
    }
  }
}

export class SignInController extends ApiController<SignInRequest, SignInResponse> {
  options(){
    return {
      paths: ['/sign-in'],
      allowedMethod: 'post',
      authStrategies: null,
      requestResolver: new SignInRequestResolver()
    }
  }

  public async handleRequest(req: ApiRequest<SignInRequest>, res: ApiResponse<SignInResponse>): Promise<void>{
    // log user in
  }
}