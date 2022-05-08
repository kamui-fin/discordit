import { ErrorRequestHandler } from "express"
import { logger } from "../utils"

export const errorHandler: ErrorRequestHandler = (err, _, res) => {
    const { httpCode, name, description } = err
    logger.error(err)

    res.status(httpCode).send({
        ok: false,
        error: {
            name,
            description
        }
    })
}
