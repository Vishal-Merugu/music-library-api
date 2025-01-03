import type { EnvConfig } from "../../global";

import dotenv from "dotenv";
dotenv.config();

const requiredEnvVars = [
  "DATABASE_URL",
  "PORT",
  "JWT_SECRET",
  "REDIS_HOST",
  "REDIS_PORT",
] as const;

export const validateEnv = (): void => {
  requiredEnvVars.forEach((envVar) => {
    if (!process.env[envVar]) {
      console.error(`\x1b[31m${envVar} is required\x1b[0m`);
      process.exit(1);
    }
  });
};

const env: EnvConfig = {
  DATABASE_URL: process.env.DATABASE_URL,
  PORT: process.env.PORT || "8080",
  JWT_SECRET: process.env.JWT_SECRET!,
  NODE_ENV: process.env.NODE_ENV || "development",
  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PORT: process.env.REDIS_PORT,
} as const;

export default env;
