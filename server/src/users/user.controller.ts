import type { NextFunction, Request, Response } from "express";
import type UserService from "./user.service.js";
import { createUserSchema } from "./create-user.validator.js";
import createHttpError from "http-errors";

export default class UserController {
  constructor(private userService: UserService) {
    this.create = this.create.bind(this);
    this.getAll = this.getAll.bind(this);
    this.getOne = this.getOne.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  create = async (req: Request, res: Response, next: NextFunction) => {

    console.log(req.body);

    const validator = createUserSchema.safeParse(req.body);

    if (!validator.success) {
      const err = createHttpError(400, validator.error.message);
      next(err);
      return;
    }

    const { email, userName, password } = req.body;

    const user = await this.userService.create({ email, userName, password });
    res.status(201).json(user);
  };

  getAll = async (req: Request, res: Response, next: NextFunction) => {

    const users = await this.userService.getAll(req);

    res.status(200).json(users);
  };

  getOne = async (req: Request, res: Response, next: NextFunction) => {
    const user = await this.userService.findById(req.params.id as string);

    if (!user) {
      const err = createHttpError(404, "User not found");
      next(err);
      return;
    }

    res.status(200).json(user);
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    const user = await this.userService.findById(req.params.id as string);

    if (!user) {
      const err = createHttpError(404, "User not found");
      next(err);
      return;
    }

    const updatedUser = await this.userService.update(
      req.params.id as string,
      req.body
    );
    res.status(200).json(updatedUser);
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    const user = await this.userService.findById(req.params.id as string);

    if (!user) {
      const err = createHttpError(404, "User not found");
      next(err);
      return;
    }

    const deletedUser = await this.userService.delete(req.params.id as string);
    res.status(200).json(deletedUser);
  };
}
