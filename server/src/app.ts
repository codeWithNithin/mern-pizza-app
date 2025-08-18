import express from "express";
import cookieParser from "cookie-parser" 

import healthCheckRouter from "./healthCheck/healthCheck.routes.js";
import { globalErrHandler } from "./common/middlewares/globarlErrorHandler.js";
import authRouter from "./users/auth.router.js";
import userRouter from "./users/user.router.js";

const app = express();

app.use(cookieParser())
app.use(express.json());

app.use("/health-check", healthCheckRouter);
app.use('/auth', authRouter);
app.use('/users', userRouter)


app.use(globalErrHandler)

export default app;
