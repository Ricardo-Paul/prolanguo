import * as fs from "fs";
import * as path from "path";
import { ConfigResolver } from "../resolvers/ConfigResolver";
import * as jsYaml from "js-yaml";
import * as appRoot from "app-root-path";
import { Config } from "../interfaces/Config";


export function loadConfig(): Config{
  const config = fs.readFileSync(
    path.join(appRoot.toString(), 'config', 'config.yml'),
    { encoding: 'utf-8' }
  );

  const configObject = jsYaml.load(config);
  const resolvedConfig = new ConfigResolver().resolve(configObject, true);
  return resolvedConfig
}