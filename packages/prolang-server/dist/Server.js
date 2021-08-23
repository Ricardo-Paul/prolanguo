"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const chalk = require("chalk");
const express = require("express");
class Server {
    displayMessage(message) {
        console.log(`${chalk.bold.white.bgBlue(`${message}`)}`);
    }
    setup() {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(this.displayMessage("All services are set, ready to go."));
            }
            catch (error) {
                reject(error);
            }
        });
    }
    // public by default
    start() {
        console.log("Starting the App");
        const app = express();
        app.listen(8082, () => {
            // TODO: use a logger instead
            console.log(`Server is listening on port ${this.displayMessage(' 8082 ')}`);
        });
    }
}
exports.Server = Server;
//# sourceMappingURL=Server.js.map