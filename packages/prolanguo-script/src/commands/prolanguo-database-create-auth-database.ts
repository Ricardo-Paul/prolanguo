#!/usr/bin/env node

import * as chalk from "chalk";
import * as inquirer from "inquirer";
import { program } from "commander";
import { DatabaseManagerFacade } from "@prolanguo/prolanguo-remote-db";

async function exec() {
    console.log(`${chalk.blue("Entries for creating auth database")}`);

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

    console.log("About to create auth database...")
    await databaseManager.createAuthDatabaseIfNotExists({
        host,
        port,
        databaseName,
        user,
        password,
        connectionLimit: 20
    });
    
}

exec();