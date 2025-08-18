import type { NextFunction, Request, Response } from "express";
import UserModel from "./user.model.js";
import type { UserSchema } from "./user.types.js";

export default class UserService {
  constructor() {}

  create = async (userData: UserSchema) => {
    return await UserModel.create(userData);
  };

  findByEmail = async (email: string) => {
    return await UserModel.findOne({ email });
  };

  findById = async (id: string) => {
    return await UserModel.findById(id);
  };
  getAll = async () => {
    return await UserModel.find({}).select("-password");
  };

  update = async (id: string, userData: UserSchema) => {
    return await UserModel.findByIdAndUpdate(id, userData, { new: true });
  };

  delete = async (id: string) => {
    return await UserModel.findByIdAndDelete(id);
  };
}
