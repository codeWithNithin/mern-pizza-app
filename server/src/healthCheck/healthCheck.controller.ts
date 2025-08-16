import type { NextFunction, Request, Response } from "express";

export default class HealthCheckController {
  check = (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({ message: "Server is running" });
  };
}
