import { ErrorRequestHandler } from "express"

export const errorHandler: ErrorRequestHandler = (err, _, res) => {
    const { statusCode = 500, message } = err
    console.error(err)
    res.status(statusCode).send({
        status: statusCode,
        message,
    })
}
