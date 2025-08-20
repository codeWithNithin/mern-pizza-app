import type { NextFunction, Request, Response } from "express";
import type UserService from "./user.service.js";
import createHttpError from "http-errors";
import type { AuthRequest } from "./user.types.js";
import { createUserSchema } from "./create-user.validator.js";
import { loginUserSchema } from "./login.validator.js";
import type { Logger } from "winston";
import { Roles } from "../constants/index.js";

export default class AuthController {
  constructor(private userService: UserService, private logger: Logger) {}

  register = async (req: Request, res: Response, next: NextFunction) => {
    // 1. validate the Request body

    const validator = createUserSchema.safeParse(req.body);

    console.log(validator.error);

    if (!validator.success) {
      const err = createHttpError(400, validator.error.message);
      next(err);
    }

    const { email, userName, password } = req.body;

    this.logger.debug("New request to register a user", {
      userName,
      email,
      password: "******",
    });

    // 2. check if that user already exists by cheking the email id
    const user = await this.userService.findByEmail(email);

    // 3. if found then send err msg saying user already exists 400.
    if (user) {
      const err = createHttpError(400, "User Already exists");
      next(err);
    }

    // 5. then create the user
    const newUser = await this.userService.create({
      email,
      userName,
      password,
      role: Roles.CUSTOMER,
    });

    this.logger.info("User has been registered", { id: newUser._id });

    //6. generate the token and save it in cookie
    const token = newUser.generateToken();

    res.cookie("token", token, {
      domain: "localhost",
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    //7.. send success msg
    res.status(201).json({ id: newUser._id });
  };

  login = async (req: Request, res: Response, next: NextFunction) => {
    const validator = loginUserSchema.safeParse(req.body);

    if (!validator.success) {
      const err = createHttpError(400, validator.error.message);
      next(err);
    }

    const { email, password } = req.body;

    this.logger.debug("New request to login a user", {
      email,
      password: "******",
    });

    // 2. check if that user already exists by cheking the email id
    const user = await this.userService.findByEmail(email);

    // 3. if found then send err msg saying user already exists 400.
    if (!user) {
      const err = createHttpError(400, "Invalid credentials");
      next(err);
      return;
    }

    // 3. check if password is correct
    const isPasswordCorrect = user.comparePassword(password);

    if (!isPasswordCorrect) {
      const err = createHttpError(400, "Invalid credentials");
      next(err);
      return;
    }

    // 4. generate the token and save it in cookie
    const token = user.generateToken();

    res.cookie("token", token, {
      domain: "localhost",
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    this.logger.info("User has been logged in", { id: user._id });

    // 5. send success msg
    res.status(200).json({ id: user._id });
  };

  self = async (req: AuthRequest, res: Response, next: NextFunction) => {
    res.status(200).json(req.user);
  };

  logout = (req: AuthRequest, res: Response, next: NextFunction) => {
    res.clearCookie("token");
    this.logger.info("User has been logged out", { id: req.user?._id });

    res.status(200).json({ message: "Logout successful" });
  };
}
