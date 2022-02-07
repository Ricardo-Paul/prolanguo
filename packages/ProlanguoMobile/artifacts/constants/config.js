"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const ConfigResolver_1 = require("../resolvers/ConfigResolver");
const rawConfig = require("../../config/config.json");
exports.config = new ConfigResolver_1.ConfigResolver().resolve(rawConfig, true);
