import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import healthCheckRouter from "./healthCheck/healthCheck.routes.js";
import { globalErrHandler } from "./common/middlewares/globarlErrorHandler.js";
import authRouter from "./users/auth.router.js";
import userRouter from "./users/user.router.js";
import { Config } from "./config/index.js";

const app = express();

const ALLOWED_DOMAINS = [Config.CLIENT_UI];

app.use(
  cors({
    origin: ALLOWED_DOMAINS as string[],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

app.use("/health-check", healthCheckRouter);
app.use("/auth", authRouter);
app.use("/users", userRouter);

app.use(globalErrHandler);

export default app;
