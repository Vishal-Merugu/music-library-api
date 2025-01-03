import env from "./config/env";
import createApp from "./app";

const startServer = async () => {
  try {
    const app = await createApp();

    app.listen(env.PORT, () => {
      console.log(`🚀 Server running on http://localhost:${env.PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
