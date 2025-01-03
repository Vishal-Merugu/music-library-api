// app.ts
import express, { Application } from "express";
import cors from "cors";
import connectDB from "./config/database";
import { validateEnv } from "./config/env";
import { createRedisClient } from "./config/redis";

// Routes
import authRoutes from "./modules/auth/routes";
import userRoutes from "./modules/users/routes";
import artistRoutes from "./modules/artists/routes";
import albumRoutes from "./modules/albums/routes";
import trackRoutes from "./modules/tracks/routes";
import favoriteRoutes from "./modules/favorites/routes";
import { logRequest } from "./modules/auth/utils";

const createApp = async (): Promise<Application> => {
  // Validate environment variables
  validateEnv();

  const app: Application = express();

  // Connect to services
  await connectDB();
  await createRedisClient();

  // Middleware
  app.use(cors());
  app.use(express.json());

  app.use(logRequest);

  app.use(authRoutes);

  const apiRoutes = [
    { path: "/users", router: userRoutes },
    { path: "/artists", router: artistRoutes },
    { path: "/albums", router: albumRoutes },
    { path: "/tracks", router: trackRoutes },
    { path: "/favorites", router: favoriteRoutes },
  ];

  apiRoutes.forEach(({ path, router }) => {
    app.use(path, router);
  });

  // Error handling
  // app.use(errorMiddleware);

  return app;
};

export default createApp;
