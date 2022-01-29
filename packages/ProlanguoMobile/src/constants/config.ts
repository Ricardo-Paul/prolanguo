import { ConfigResolver } from "../resolvers/ConfigResolver";

const rawConfig = require("../../config/config.json");

export const config = new ConfigResolver().resolve(rawConfig, true);