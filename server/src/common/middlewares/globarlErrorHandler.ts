import type { NextFunction, Request, Response } from "express"
import type { HttpError } from "http-errors"
import { Config } from "../../config/index.js"
import logger from "../../config/logger.js"

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

    logger.error(err.message, {
        statusCode,
        path: req.path,
        method: req.method,
        error: err.stack,
    })

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