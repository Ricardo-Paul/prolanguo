"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const chalk = require("chalk");
const express = require("express");
const ApiControllerFactory_1 = require("./api/ApiControllerFactory");
const ApiRouterFactory_1 = require("./api/ApiRouterFactory");
class Server {
    constructor() {
        this.apiControllerFactory = new ApiControllerFactory_1.ApiControllerFactory();
        this.apiRouterFactory = new ApiRouterFactory_1.ApiRouterFactory();
    }
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
        // enforce type
        const controllers = this.apiControllerFactory.makeControllers();
        app.use("/api/v1", this.apiRouterFactory.make(controllers));
        app.get('/test', function (req, res) {
            console.log("Tested on console");
            res.send("testing request");
        });
        app.listen(8082, () => {
            // TODO: use a logger instead
            console.log(`Server is listening on port 8082`);
        });
    }
}
exports.Server = Server;
//# sourceMappingURL=Server.js.map