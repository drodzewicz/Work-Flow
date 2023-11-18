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
  environment: utils.getEnv("NODE_ENV", false),
  app: {
    routePrefix: utils.getEnv("APP_ROUTE_PREFIX", false, "api"),
    port: utils.getEnv("PORT", true),
  },
  cors: {
    url: utils.getEnv("CORS_URL", false),
  },
  jwt: {
    accessToken: {
      secret: utils.getEnv("ACCESS_TOKE_SECRET", false, "accessTokenSecret"),
      // lifespan in milliseconds 60 (min) * 60 (s) = 1 h
      lifespanSeconds: 60 * 60,
    },
    refreshToken: {
      secret: utils.getEnv("REFRESH_TOKE_SECRET", false, "refreshTokenSecret"),
      // lifespan in milliseconds 24(hours) * 60 (min) * 60 (s) = 1 day
      lifespanSeconds: 24 * 60 * 60,
    },
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
    seed: utils.getEnv("DB_SEED", false),
  },
};
