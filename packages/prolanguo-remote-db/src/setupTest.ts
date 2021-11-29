import * as dotenv from "dotenv";
import 'jest-extended';
import * as path from "path";
jest.setTimeout(25000);


dotenv.config({
  path: path.resolve(process.cwd(), "config", ".env")
});
