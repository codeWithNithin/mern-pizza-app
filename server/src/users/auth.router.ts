import { Router, type RequestHandler } from "express";
import AuthController from "./auth.controller.js";
import UserService from "./user.service.js";
import asyncHandler from "../common/utils/asyncWrapper.js";
import protect from "../common/middlewares/authenticate.js";

const router = Router();

const userService = new UserService();
const authController = new AuthController(userService);

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
 * @path: /auth/logout
 * @method: GET
 */
router.get(
  "/logout",
  asyncHandler(protect as unknown as RequestHandler),
  asyncHandler(authController.logout as unknown as RequestHandler)
);

export default router;
