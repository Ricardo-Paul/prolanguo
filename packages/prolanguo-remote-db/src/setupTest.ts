import * as dotenv from "dotenv";
import 'jest-extended';
import * as path from "path";
jest.setTimeout(15000);


dotenv.config({
  path: path.resolve(process.cwd(), "config", ".env")
});
