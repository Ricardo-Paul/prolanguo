import { Server } from "./Server";

const server = new Server();

server.setup()
.then(
  (value): void => {
    console.log(value);
    server.start()
  }
).catch(
  (error): void => {
    console.log('Something occurred while setting up the sever', error)
  }
)