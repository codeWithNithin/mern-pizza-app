import app from "./app.js";
import { Config } from "./config/index.js";

function startServer() {
  const PORT = Config.PORT;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

startServer();
