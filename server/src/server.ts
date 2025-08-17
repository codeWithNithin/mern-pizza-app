import app from "./app.js";
import ConnectDB from "./config/db.js";
import { Config } from "./config/index.js";
import logger from "./config/logger.js";

async function startServer() {
  const PORT = Config.PORT;
  await ConnectDB();
  app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`, { port: PORT });
  });
}

void startServer();
