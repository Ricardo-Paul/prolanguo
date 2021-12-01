import { Knex } from "knex";
import { TableName } from "../enums/tableName";
import { promisifyQuery } from "./PromisifyQuery";

export interface ResetPasswordRequestRow{
  userId: string;
  resetPasswordKey: string;
  expiredAt: Date;
}

export class ResetPasswordRequestModel{
  public upsertRequestPasswordReset(
    db: Knex,
    resetPasswordRequestRow: Omit<ResetPasswordRequestRow, 'expiredAt'>,
    expirationHours: number
  ): Promise<void>{
    return new Promise(
      async (resolve, reject): Promise<void> => {
        try{
          const { userId, resetPasswordKey } = resetPasswordRequestRow;
          await promisifyQuery(
            db
            .raw(`
              INSERT INTO ${TableName.RESET_PASSWORD_REQUEST}
                (userId, resetPasswordKey, expiredAt)
              VALUES(?, ?, DATE_ADD(NOW(), INTERVAL ${expirationHours} HOUR))
              ON DUPLICATE KEY UPDATE
                resetPasswordKey = VALUES(resetPasswordKey),
                expiredAt = VALUES(expiredAt)
            `,[userId, resetPasswordKey])
          );
        resolve()
        }catch(error){
          reject(error)
        }
      }
    );
  };
};