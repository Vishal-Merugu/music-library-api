import { UserDocument } from "./src/models/User";

interface EnvConfig {
  DATABASE_URL: string;
  PORT: string;
  JWT_SECRET: string;
  NODE_ENV: "development" | "production" | "test";
  REDIS_HOST: string;
  REDIS_PORT: string;
}

declare global {
  namespace NodeJS {
    interface ProcessEnv extends EnvConfig {}
  }

  namespace Express {
    interface Request {
      user: UserDocument;
    }
  }
}

export type { EnvConfig };
