#!/usr/bin/env node

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
    default: program.host || 'localhost'
  },
  {
    type: 'input',
    name: 'user',
    message: 'Enter database user',
    default: program.user || 'root'
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
    default: program.port || 3306
  },
  {
    type: 'input',
    name: 'shardIdStr',
    message: 'Enter Shard Ids (separated by comma)',
    default: program.shardIds || ''
  },
])

const { host, user, password, port, shardIds } = answers;

console.log('Creating shard database', answers, program.host);
}

exec();