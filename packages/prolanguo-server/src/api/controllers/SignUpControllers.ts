import { ApiController } from "./ApiController";
import { SignUpRequest } from "@prolanguo/prolanguo-common/interfaces";
import { SignUpRequestResolver } from "@prolanguo/prolanguo-common/resolvers";
import { ControllerOptions } from "../../interfaces/ControllerOptions";
import { AuthenticatorFacade } from "../../facades/AuthenticatorFacace";
import { ApiRequest } from "../ApiRequest";
import { Config } from "../../interfaces/Config";
import * as uuid from "uuid";
import * as moment from "moment";
import knex, { Knex } from "knex";

// database stuff
import { DatabaseFacade, UserModel } from "@prolanguo/prolanguo-remote-db";
import { ApiResponse } from "../ApiResponse";

enum UserMemberShip {
  REGULAR = 'REGULAR',
  LIFETIME_PREMIUM = 'LIFETIME_PREMIUM',
  SUBSCRIBED_PREMIUM = 'SUBSCRIBED_PREMIUM'
}

enum UserStatus {
  ACTIVE = 'ACTIVE',
  DISABLED = 'DISABLED'
}

interface User {
  readonly userId: string;
  readonly email: string;
  readonly userStatus: UserStatus;
  readonly membership: UserMemberShip;
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

  // TODO: add type annotation to req and res
  public async handleRequest(req: ApiRequest<SignUpRequest>, res: ApiResponse<SignUpResponse>): Promise<void> {
    console.log("Handling signup request")
    const db = this.database.getDb("auth");
    const { email, password } = req.body;
    console.log("Resolved Request Body :", req.body)

    await db.transaction( (tx) => {
      return new Promise(async (resolve, reject) => {
        try {
          const accessKey = uuid.v4();
          const userId = uuid.v4();
          const shardId = this.database.getRandomShardId();
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
            throw new Error(`Ouch! it seems that you already signed up`)
          } else {
            console.log("Trying to insert user row")
            await this.userModel.insertUser(tx, {
              userId,
              email,
              userStatus: "new user",
              membership: "user membership",
              membershipExpiredAt: moment().toDate(),
              createdAt: moment().toDate(),
              updtateAt: moment().toDate(),
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
            message: "signed up"
          });
        } catch (err) {
          reject(err)
        }
      })
    })

    res.json({
      accessToken: "any access token",
      currentUser: {}
    })
  }
}

// Next: write emailExists method for UserModel
// Write a password encryptor
// Write a method to get random Shard Id
// Write insert user method