import { Router } from "express";
import UserController from "./user.controller.js";
import UserService from "./user.service.js";
import { createUserSchema } from "./create-user.validator.js";
import asyncHandler from "../common/utils/asyncWrapper.js";

const router = Router();

const userService = new UserService();
const userController = new UserController(userService);

router.post("/", asyncHandler(userController.create));

router.get("/", asyncHandler(userController.getAll));

router.get("/:id", asyncHandler(userController.getOne));

router.patch("/:id", asyncHandler(userController.update));

router.delete("/:id", asyncHandler(userController.delete));

export default router;
