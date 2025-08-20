import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import createHttpError from "http-errors";
import { Config } from "../../config/index.js";
import User from "../../users/user.model.js";
import type { AuthRequest, UserResponse } from "../../users/user.types.js";

async function protect(req: AuthRequest, res: Response, next: NextFunction) {
  console.log((req as unknown as Request).cookies);
  const token = (req as unknown as Request).cookies?.token as string;
  if (!token) {
    const err = createHttpError(401, "You are not logged in");
    next(err);
  }

  try {
    const decodedToken = jwt.verify(token, Config.JWT_SECRET as string) as unknown as {
     id: string;
    };
    const user: UserResponse | null = await User.findById(decodedToken.id).select("-password");

    if (!user) {
      const err = createHttpError(400, "Invalid token");
      next(err);
    }

    req.user = user as UserResponse
    next();
  } catch (error) {
    const err = createHttpError(400, "Invalid token");
    next(err);
  }
}

export default protect;
