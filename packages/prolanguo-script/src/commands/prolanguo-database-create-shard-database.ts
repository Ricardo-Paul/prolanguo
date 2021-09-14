#!/usr/bin/env node
import { DatabaseManagerFacade } from "@prolanguo/prolanguo-remote-db"

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
      default: ''
    },
  ]);

  const { host, user, password, port, shardIdStr } = answers;

  console.log('Creating shard database', answers, program.host);


  const shardIds: number[] = shardIdStr.split(",").map((shardId: string): number => {
    return parseInt(shardId.trim());
  });

  const db = {
    shardId: 0,
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'ricardo00',
    connectionLimit: 20
  }

  const shardDbPrefix = 'prolanguo_shard_db_';
  const databaseManager = new DatabaseManagerFacade();
  const existed = await databaseManager.databaseExists(db, shardDbPrefix)

  console.log('Shard Ids number ', shardIds);
  console.log("EXISTED :", existed);

}

exec();