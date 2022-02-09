#!/usr/bin/env node
import { DatabaseManagerFacade, ShardDatabaseFacade, ShardDbConfig } from "@prolanguo/prolanguo-remote-db"
import chalk = require("chalk");

const { program } = require('commander');
import * as inquirer from "inquirer";
import { loadConfig } from "../setup/loadConfig";



async function exec() {
  program
    .option('-h, --host <host>', 'Database host')
    .option('-u, --user <user>', 'Database user')
    .option('-p, --port <port>', 'Database port')
    .option('-s --shardIds <shardIds>', 'Shard Ids for database (comma seprated)')
    .parse(process.argv);

    const config = loadConfig();
    console.log(chalk.blue('Calling Load config'), config.shardDb.shardDatabaseNamePrefix,);

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


  const shardDbPrefix = config.shardDb.shardDatabaseNamePrefix;
  const databaseManager = new DatabaseManagerFacade();

  // creating the shard databases
  shardIds.map(async (shardId) => {
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

    try {
      if (existed === false) {
        console.log(`Creating database ${shardDbPrefix}${config.shardId}`);
        await databaseManager.createShardDatabaseIfNotExists(config, shardDbPrefix);
      } else {
        console.log(`Database already exists: ${shardDbPrefix}${config.shardId}`);
      }
    } catch (err) {
      console.log(err);
    }

  });
  console.log('Shard Ids number ', shardIds);

  // connecting to the shard databases;
  const allShardDbConfigs: Array<ShardDbConfig> = shardIds.map((shardId: number) => {
    // create many configs identified by shardIds
    return {
      shardId,
      host,
      port,
      user,
      password,
      connectionLimit: 20
    }
  })
  const shardDatabase = new ShardDatabaseFacade(allShardDbConfigs, shardDbPrefix);
  console.log('Random Shard ID :', shardDatabase.getRandomShardId());

  // running sharded databases migrations
  shardDatabase.checkAllShardDatabaseTables();
}

exec(); 