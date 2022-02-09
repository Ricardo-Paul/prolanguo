import { ApiController } from "./ApiController";
import { SignUpRequest } from "@prolanguo/prolanguo-common/interfaces";
import { SignUpRequestResolver } from "@prolanguo/prolanguo-common/resolvers";
import { ControllerOptions } from "../../interfaces/ControllerOptions";
import { AuthenticatorFacade } from "../../facades/AuthenticatorFacace";
import { UserStatus, UserMembership } from "@prolanguo/prolanguo-common/enums";
import { ApiRequest } from "../ApiRequest";
import { Config } from "../../interfaces/Config";
import * as uuid from "uuid";
import * as moment from "moment";
import { assertExists } from "../../utils/assertExists";
import { ErrorCode } from "@prolanguo/prolanguo-common/enums";
// database stuff
import { DatabaseFacade, UserModel } from "@prolanguo/prolanguo-remote-db";
import { ApiResponse } from "../ApiResponse";

interface User {
  readonly userId: string;
  readonly email: string;
  readonly userStatus: UserStatus;
  readonly membership: UserMembership;
  readonly membershipExpiredAt: null | Date;
  readonly updatedAt: Date;
  readonly createdAt: Date;
  readonly firstSyncedAt: Date | null;
  readonly lastSyncedAt: Date | null;
  // readonly extraData: readonly UserExtraDataItem[]; //to implement
}

interface SignUpResponse {
  readonly currentUser: User;
  readonly accessToken: string;
}

export class SignUpController extends ApiController<SignUpRequest, SignUpResponse> {

  private database: DatabaseFacade;
  private userModel: UserModel;
  private config: Config;
  private authenticator: AuthenticatorFacade;

  constructor(
    database: DatabaseFacade, 
    userModel: UserModel, 
    config: Config,
    authenticator: AuthenticatorFacade
    ) {
    super()
    this.database = database;
    this.userModel = userModel;
    this.config = config;
    this.authenticator = authenticator;
  }

  public options(): ControllerOptions<SignUpRequest> {
    return {
      paths: ['/sign-up'],
      allowedMethod: 'post',
      authStrategies: null,
      requestResolver: new SignUpRequestResolver(
        this.config.user.passwordMinLength
      )
    }
  }

  public async handleRequest(req: ApiRequest<SignUpRequest>, res: ApiResponse<SignUpResponse>): Promise<void> {
    console.log("Handling signup request")
    const db = this.database.getDb("auth");
    const { email, password } = req.body;
    const accessKey = uuid.v4();
    const userId = uuid.v4();
    const shardId = this.database.getRandomShardId();

    console.log("Resolved Request Body :", req.body)

    const { errorCode } = await db.transaction( (tx): Promise<{ 
      errorCode: null | string
     }> => {
      return new Promise(async (resolve, reject) => {
        try {

          const encryptedPassword = await this.authenticator.encryptPassword(
            password,
            this.config.user.passwordEncryptionSaltRounds
          );

          console.log(`
            encryptedPassword: ${encryptedPassword},
            userId: ${userId},
            accessKey: ${accessKey}
          `)
          
          const emailExists = await this.userModel.emailExists(tx, email);

          // TODO: move error messages elsewhere
          console.log("Is this email existed ?", emailExists)
          if (emailExists) {
            resolve({
              errorCode: ErrorCode.USER__EMAIL_ALREADY_REGISTERED
            });
          } else {
            console.log("Trying to insert user row")
            await this.userModel.insertUser(tx, {
              userId,
              email,
              userStatus: UserStatus.ACTIVE,
              membership: UserMembership.REGULAR,
              membershipExpiredAt: null,
              createdAt: moment().toDate(),
              updatedAt: moment().toDate(),
              firstSyncedAt: null,
              lastSyncedAt: null,
              extraData: []
            }, 
            encryptedPassword, 
            accessKey, 
            shardId
          )
          };
          resolve({
            errorCode: null
          });
        } catch (err) {
          reject(err)
        }
      })
    });

    console.log('ERROR CODE :', errorCode, typeof errorCode);
    if(errorCode !== null){
      console.log('There was an error, could not process request', errorCode);
      res.error(500, {
        errorCode
      });
    } else {
      console.log('Sign up successful');
      const currentUser = assertExists(
        await this.userModel.getUserById(db, userId),
        "User is null or undefined, (signupController)"
      );
      console.log('JUST SIGNUP USER :', currentUser);

      const accessToken = this.authenticator.createAccessToken(currentUser.userId, accessKey);
      res.json({
        accessToken,
        currentUser
      })
    };
  }
};

// logger
// some formal tests