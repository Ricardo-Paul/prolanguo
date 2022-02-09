import { Knex } from "knex";
import { TableName } from "../../enums/tableName";

// TODO: move this declaration to the common package.
enum UserMembership {
  REGULAR = 'REGULAR',
  LIFETIME_PREMIUM = 'LIFETIME_PREMIUM',
  SUBSCRIBED_PREMIUM = 'SUBSCRIBED_PREMIUM'
}

export async function migration_04(tx: Knex.Transaction): Promise<void>{
  await addMembershipColumnsToUserTable(tx);
}

function addMembershipColumnsToUserTable(db: Knex.Transaction): Knex.Raw{
  return db.raw(`
    ALTER TABLE ${TableName.USER}
    ADD membership VARCHAR(60) NOT NULL DEFAULT '${UserMembership.REGULAR}',
    ADD membershipExpiredAt DATETIME;
  `)
}