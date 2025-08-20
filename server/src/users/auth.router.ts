import { Router, type RequestHandler } from "express";
import AuthController from "./auth.controller.js";
import UserService from "./user.service.js";
import asyncHandler from "../common/utils/asyncWrapper.js";
import protect from "../common/middlewares/authenticate.js";
import logger from "../config/logger.js";

const router = Router();

const userService = new UserService();

const authController = new AuthController(userService, logger);

/**
 * @path: /auth/register
 * @method: POST
 */
router.post("/register", authController.register);

/**
 * @path: /auth/login
 * @method: POST
 */
router.post("/login", authController.login);

/**
 * @path: /auth/self
 * @method: GET
 */
router.get(
  "/self",
  asyncHandler(protect as unknown as RequestHandler),
  asyncHandler(authController.self as unknown as RequestHandler)
);

/**
 * @path: /auth/logout
 * @method: GET
 */
router.get(
  "/logout",
  asyncHandler(protect as unknown as RequestHandler),
  asyncHandler(authController.logout as unknown as RequestHandler)
);

export default router;
