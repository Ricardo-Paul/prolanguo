#!/usr/bin/env node


const { program } = require('commander');

program.command('create-auth-database', 'Create auth database').alias('create-auth-db')
  .command('create-shard-database', 'Create shard database').alias('create-shard-db')
  .parse(process.argv)