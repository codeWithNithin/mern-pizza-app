import { Router } from "express";
import AuthController from "./auth.controller.js";
import UserService from "./user.service.js";

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
router.get("/loout", authController.logout);

export default router;
