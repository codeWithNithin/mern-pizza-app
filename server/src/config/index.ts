import dotenv from "dotenv";

dotenv.config({ path: `./.env.${process.env.NODE_ENV || "development"}` });

const { PORT } = process.env;

export const Config = {
  PORT,
};
