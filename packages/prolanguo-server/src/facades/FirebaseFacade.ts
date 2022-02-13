import * as admin from "firebase-admin";
import * as appRoot from "app-root-path";
import * as path from "path";
import { UserModel } from "@prolanguo/prolanguo-remote-db";

export class FirebaseFacade {
  private userModel: UserModel;

  constructor(
    firebaseServiceAccountPath: string,
    databaseUrl: string,
    userModel: UserModel
  ) {

    this.userModel = userModel;
    const serviceAccount = require(path.join(
      appRoot.toString(),
      firebaseServiceAccountPath
    ));

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: databaseUrl
    });
  };

  public createUser(userId: string) {
    return admin.auth().createUser({
      uid: userId
    })
  };

  public userExists(userId: string): Promise<boolean>{
    return new Promise(async (resolve, reject) => {
      try{
        const user = await admin.auth().getUser(userId);
        if(user){
          resolve(true)
        } else {
          resolve(false)
        }
      } catch(error){
        reject(error)
      }
    })
  }
  
  public async notifySetChange(shardDb: any, userId: string){
    const setLatestSyncTime = await this.userModel.getLatestSyncTime(shardDb, userId);
    this.updateData(userId, { setLatestSyncTime });
  }
  
  private updateData(userId: string, data: { [P in string]: any }): Promise<void> {
    return admin
      .database()
      .ref(`users/${userId}`)
      .update(data)
  }
};