import { ApiController } from "./ApiController";
import { SignInRequest } from "@prolanguo/prolanguo-common/interfaces";
import { ApiRequest } from "../ApiRequest";
import { ApiResponse } from "../ApiResponse";
import { assertExists } from "../../utils/assertExists";
import { DatabaseFacade, UserModel } from "@prolanguo/prolanguo-remote-db";
import { AuthenticatorFacade } from "../../facades/AuthenticatorFacace";
import { ErrorCode } from "@prolanguo/prolanguo-common/dist/enums";
import { ControllerOptions } from "./../../interfaces/ControllerOptions";
import { RequestResolver } from "@prolanguo/prolanguo-common/dist/resolvers";
import Joi = require("joi");


interface SignInResponse{
  currentUser: {

  },
  accessToken: string
}

class SignInRequestResolver extends RequestResolver<SignInRequest>{
  rules = {
    body: {
      email: Joi.string().email(),
      password: Joi.string()
    }
  }
}

export class SignInController extends ApiController<SignInRequest, SignInResponse> {
  private database: DatabaseFacade
  private userModel: UserModel;
  private authenticator: AuthenticatorFacade;

  constructor(
    database: DatabaseFacade,
    userModel: UserModel, 
    authenticator: AuthenticatorFacade
    ){
    super()
    this.userModel = userModel;
    this.database = database;
    this.authenticator = authenticator;
  };

  public options(): ControllerOptions<SignInRequest>{
    return {
      paths: ['/sign-in'],
      allowedMethod: 'post',
      authStrategies: null,
      requestResolver: new SignInRequestResolver()
    }
  }

  public async handleRequest(req: ApiRequest<SignInRequest>, res: ApiResponse<SignInResponse>): Promise<void> {
    const db = this.database.getDb('auth');
    console.log("Signin Body :", req.body, req.body.email, req.body.password)

    return new Promise(
      async (resolve, reject): Promise<void> => {
        try{
          const { email, password } = req.body;
          const result = assertExists(await this.userModel.getUserByEmail(db, email), `Cannot find user with email ${email}`);
          if(!result){
            res.error(400, {
              errorCode: ErrorCode.USER__EMAIL_NOT_FOUND
            })
          } else {
            const { user, password: encryptedPassword, accessKey } = result;
            const isPasswordCorrect = await this.authenticator.validatePassword(password, encryptedPassword);
  
            if(isPasswordCorrect){
              const { userId, } = user;
              const accessToken = this.authenticator.createAccessToken(userId, accessKey);
  
              res.json({
                currentUser: user,
                accessToken
              })
            } else {
              res.error(401, {
                errorCode: ErrorCode.USER__WRONG_PASSWORD
              })
            };
  
          resolve()
          }
        }catch(error){
          reject(error)
        }
      }
    );
  }
}