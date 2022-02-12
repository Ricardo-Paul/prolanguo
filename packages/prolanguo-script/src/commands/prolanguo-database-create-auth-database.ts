#!/usr/bin/env node

import * as chalk from "chalk";
import * as inquirer from "inquirer";
import { program } from "commander";
import { DatabaseManagerFacade, AuthDatabaseFacade } from "@prolanguo/prolanguo-remote-db";

async function exec() {
    console.log(`${chalk.blue("Entries for creating auth database")}`);

    console.log(`${chalk.yellow(`Running these migrations kinda sucks *, 
    if you are  going through issues, you may need to run them one by one. 
    Also comment 'createAuthDatabaseIfNotExists' once db is created. This needs to be fixed should more engineers start working on prolanguo
    `)}`)

    const answers = await inquirer.prompt([
        {
            type: "input",
            name: "host",
            message: "Enter database host",
            default: "localhost"
        },
        {
            type: "input",
            name: "user",
            message: "Enter database user",
            default: "root"
        },
        {
            type: "password",
            name: "password",
            message: "Enter database passowrd"

        },
        {
            type: "input",
            name: "port",
            message: "Enter database port",
            default: "3306",
        },
        {
            type: "input",
            name: "databaseName",
            message: "Enter database name",
            default: "prolanguo_auth_db"
        }
    ]);

    const { host, user, password, port, databaseName } = answers;
    console.log("Your answer :", host);
    const databaseManager = new DatabaseManagerFacade();

    console.log("About to create auth database...");

    // please comment this block once db is created
    try{
        await databaseManager.createAuthDatabaseIfNotExists({
            host,
            port,
            databaseName,
            user,
            password,
            connectionLimit: 20
        });
    }catch(error){
        console.log(error)
    }

    const authDatabase = new AuthDatabaseFacade({
        host,
        port,
        databaseName,
        user,
        password,
        connectionLimit: 20
    });

    console.log("About to run auth datbase migrations...");
    authDatabase.checkAuthDatabaseTables();
}

exec();