#!/usr/bin/env node

import * as program from 'commander';
const Program = program.program;

Program.command('database', 'Scripts for database').alias('db')
  .parse(process.argv)