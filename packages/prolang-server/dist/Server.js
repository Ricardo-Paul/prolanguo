"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const chalk = require("chalk");
const express = require("express");
class Server {
    constructor() {
    }
    ;
    // set up sevices we'll need
    async setup() {
        return new Promise(async (resolve, reject) => {
            try {
                console.log('Setting things up');
                resolve();
            }
            catch (error) {
                reject(error);
            }
        });
    }
    // start the express App
    start() {
        console.log("Starting the App");
        const app = express();
        app.listen(8082, () => {
            // TODO: use a logger instead
            console.log(`Server is listening on port ${chalk.bold.white.bgBlue(' 8082 ')}`);
        });
    }
}
exports.Server = Server;
