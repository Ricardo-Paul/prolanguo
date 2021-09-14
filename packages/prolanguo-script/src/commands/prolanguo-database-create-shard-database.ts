#!/usr/bin/env node
import { DatabaseManagerFacade, ShardDatabaseFacade } from "@prolanguo/prolanguo-remote-db"

const { program } = require('commander');
import * as inquirer from "inquirer";

async function exec() {
  program
    .option('-h, --host <host>', 'Database host')
    .option('-u, --user <user>', 'Database user')
    .option('-p, --port <port>', 'Database port')
    .option('-s --shardIds <shardIds>', 'Shard Ids for database (comma seprated)')
    .parse(process.argv);

  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'host',
      message: 'Enter host',
      default: 'localhost'
    },
    {
      type: 'input',
      name: 'user',
      message: 'Enter database user',
      default: 'root'
    },
    {
      type: 'password',
      name: 'password',
      message: 'Enter mysql password: ',
    },
    {
      type: 'input',
      name: 'port',
      message: 'Enter port number',
      default: 3306
    },
    {
      type: 'input',
      name: 'shardIdStr',
      message: 'Enter Shard Ids (separated by comma)',
      default: '0,1,2,3'
    },
  ]);

  const { host, user, password, port, shardIdStr } = answers;

  const shardIds: number[] = shardIdStr.split(",").map((shardId: string): number => {
    return parseInt(shardId.trim());
  });

  const shardDbPrefix = 'prolanguo_shard_db_';
  const databaseManager = new DatabaseManagerFacade();

  // creating the shard databases
  shardIds.map( async (shardId) => {
    const config = {
      shardId,
      host,
      port,
      user,
      password,
      connectionLimit: 20
    };
    const existed = await databaseManager.databaseExists(config, shardDbPrefix);
    console.log("EXISTED :", existed);

    try{
      if(existed === false){
        console.log(`Creating database ${shardDbPrefix}${config.shardId}`);
        await databaseManager.createShardDatabaseIfNotExists(config, shardDbPrefix);
      } else {
        console.log(`Database already exists: ${shardDbPrefix}${config.shardId}`);
      }
    }catch(err){
      console.log(err);
    }

  });
  console.log('Shard Ids number ', shardIds);

  // connecting to the shard databases;

  // TODO: remove this
  const shardConfigs = {
  // removed before commit
  }

  const allShardDbConfigs = shardIds.map((shardId: number) => {
    return {
      shardId,
      host: shardConfigs.host,
      port: shardConfigs.port,
      user: shardConfigs.user,
      password: shardConfigs.password,
      connectionLimit: 20
    }
  })
  const shardDatabase = new ShardDatabaseFacade(allShardDbConfigs, shardDbPrefix);
  console.log('Random Shard ID :', shardDatabase.getRandomShardId());
}

exec();