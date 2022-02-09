import * as fs from "fs";
import * as path from "path";
import * as appRoot from "app-root-path";
import * as jsYaml from 'js-yaml';


interface Config{
  readonly user: {
    passwordMinLength: number,
    passwordEncryptionSaltRounds: number
  }
}

export function loadConfig(): Config{
  const serverConfig = fs.readFileSync(
    path.join(
      appRoot.toString(), 'config', 'server-config.yml'
    ), { encoding: 'utf-8' }
  );
  // TODO: resolve serverConfig
  return jsYaml.load(serverConfig) as Config;
}