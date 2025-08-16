import type { NextFunction, Request, Response } from "express"
import type { HttpError } from "http-errors"
import { Config } from "../../config/index.js"

export const globalErrHandler = (
    err: HttpError,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const statusCode = err.status || 500

    // check which env u r in
    const isProduction = Config.NODE_ENV === 'prod'
    const message = isProduction ? 'Internal Server Error' : err.message

    res.status(statusCode).json({
        errors: [
            {
                type: err.name,
                msg: message,
                path: req.path,
                method: req.method,
                location: 'server',
                stack: isProduction ? null : err.stack,
            },
        ],
    })
}