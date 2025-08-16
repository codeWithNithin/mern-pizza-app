import type { NextFunction, Request, Response } from "express";
import UserModel from "./user.model.js";
import type { IUser } from "./user.types.js";

export default class UserService {
  constructor() {}

  create = async (userData: IUser) => {
    return await UserModel.create(userData);
  };

  findByEmail = async (email: string) => {
    return await UserModel.findOne({ email });
  };
}
