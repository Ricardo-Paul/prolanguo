"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Server_1 = require("./Server");
const server = new Server_1.Server();
server.setup()
    .then(() => {
    server.start();
}).catch((error) => {
    console.log('Something occurred while setting up the sever', error);
});
