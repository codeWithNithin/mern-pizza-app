import type { NextFunction, Request, Response } from "express";
import type UserService from "./user.service.js";

export default class AuthController {
  constructor(private userService: UserService) {}

  register = (req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({ message: "NOT implemented !!!!" });
  };

  login = (req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({ message: "NOT implemented !!!!" });
  };

  logout = (req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({ message: "NOT implemented !!!!" });
  };
}
