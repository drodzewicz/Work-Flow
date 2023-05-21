import * as dotenv from "dotenv";
import * as path from "path";

import * as utils from "../utils/env.utils.js";
/**
 * Load .env file or for tests the .env.test file.
 */
dotenv.config({
  path: path.join(process.cwd(), `.env`),
});
/**
 * Environment variables
 */

export const env = {
  node: utils.getEnv("NODE_ENV", false),
  app: {
    routePrefix: utils.getEnv("APP_ROUTE_PREFIX", false, "api"),
    port: utils.getEnv("PORT", true),
    banner: utils.toBool(utils.getEnv("APP_BANNER", false, "true")),
  },
  pagination: {
    limit: utils.toNumber(utils.getEnv("PAGINATION_LIMIT", false, "10")),
  },
  log: {
    level: utils.getEnv("LOG_LEVEL", false, "LOG"),
  },
  db: {
    username: utils.getEnv("DB_USERNAME"),
    password: utils.getEnv("DB_PASSWORD"),
    database: utils.getEnv("DB_URI", true),
  },
  secret: {
    secret: utils.getEnv("SECRET_KEY"),
  },
  swagger: {
    enabled: utils.toBool(utils.getEnv("SWAGGER_ENABLED")),
    route: utils.getEnv("SWAGGER_ROUTE"),
    username: utils.getEnv("SWAGGER_USERNAME"),
    password: utils.getEnv("SWAGGER_PASSWORD"),
  },
};
