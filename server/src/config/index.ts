import dotenv from "dotenv";

dotenv.config({ path: `./.env.${process.env.NODE_ENV || "development"}` });

const { PORT, NODE_ENV } = process.env;

export const Config = {
  PORT,
  NODE_ENV,
};
