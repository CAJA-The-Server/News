import { join } from "path";
import { Dialect } from "sequelize";
import { ajv } from "./ajv.js";
import { configPath } from "./configPath.js";
import { readConfig } from "./configReader.js";

const path = join(configPath, "database.json");

interface DatabaseConfig {
  readonly username: string;
  readonly password: string;
  readonly database: string;
  readonly host: string;
  readonly dialect: Dialect;
  readonly pool: {
    readonly max: number;
    readonly min: number;
  };
}

const parse = ajv.compileParser<DatabaseConfig>({
  properties: {
    username: { type: "string" },
    password: { type: "string" },
    database: { type: "string" },
    host: { type: "string" },
    dialect: { type: "string" },
    pool: {
      properties: {
        max: { type: "uint32" },
        min: { type: "uint32" },
      },
    },
  },
});

export const config = readConfig(path, parse);
