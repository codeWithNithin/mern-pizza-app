import app from "./app.js";
import { Config } from "./config/index.js";
import logger from "./config/logger.js";

function startServer() {
  const PORT = Config.PORT;
  app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`, {port: PORT});
    console.log(`Server is running on port ${PORT}`);
  });
}

startServer();
