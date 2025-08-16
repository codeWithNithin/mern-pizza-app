import mongoose from "mongoose";
import logger from "./logger.js";
import { Config } from "./index.js";

export default async function ConnectDB() {
  try {
    mongoose.connection.on("connected", () => {
      logger.info("Connected to database successfully");
    });

    mongoose.connection.on("error", (err) => {
      logger.error("Error in connecting to database.", err);
    });

    console.log("config", Config);
    await mongoose.connect(Config.MONGO_URI as any);
  } catch (error) {
    logger.error("Error in connecting to database.", error);
    process.exit(1);
  }
}
