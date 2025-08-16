import express from "express";
import healthCheckRouter from "./healthCheck/healthCheck.routes.js";
import { globalErrHandler } from "./common/middlewares/globarlErrorHandler.js";

const app = express();

app.use("/health-check", healthCheckRouter);

app.use(globalErrHandler)

export default app;
