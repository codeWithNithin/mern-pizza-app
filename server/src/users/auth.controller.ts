import type { NextFunction, Request, Response } from "express";
import type UserService from "./user.service.js";
import createHttpError from "http-errors";
import type { AuthRequest } from "./user.types.js";
import { createUserSchema } from "./create-user.validator.js";
import { loginUserSchema } from "./login.validator.js";

export default class AuthController {
  constructor(private userService: UserService) {}

  register = async (req: Request, res: Response, next: NextFunction) => {
    // 1. validate the Request body

    const validator = createUserSchema.safeParse(req.body);

    console.log(validator.error);

    if (!validator.success) {
      const err = createHttpError(400, validator.error.message);
      next(err);
    }

    const { email, userName, password } = req.body;

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
    });

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
    // 1. validate incoming request

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 2. check if that user already exists by cheking the email id
    const user = await this.userService.findByEmail(email);

    // 3. if found then send err msg saying user already exists 400.
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // 3. check if password is correct
    const isPasswordCorrect = user.comparePassword(password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // 4. generate the token and save it in cookie
    const token = user.generateToken();

    res.cookie("token", token, {
      domain: "localhost",
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    // 5. send success msg
    res.status(200).json({ id: user._id });
  };

  logout = (req: AuthRequest, res: Response, next: NextFunction) => {
    res.clearCookie("token");
    res.status(200).json({ message: "Logout successful" });
  };
}
