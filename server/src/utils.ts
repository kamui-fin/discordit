import { celebrate, Modes, SchemaOptions } from "celebrate"
import { RequestHandler } from "express"
import httpStatus from "http-status"
import winston from "winston"

type HttpStatusCode = string | number | httpStatus.HttpStatusClasses | httpStatus.HttpStatusExtra

class BaseError extends Error {
    public readonly httpCode: HttpStatusCode

    constructor(description: string, httpCode: HttpStatusCode) {
        super(description)
        Object.setPrototypeOf(this, new.target.prototype)
        Error.captureStackTrace(this)

        this.httpCode = httpCode
    }
}

export class ApiError extends BaseError {
    constructor(description = "server encountered an error", httpCode = httpStatus.INTERNAL_SERVER) {
        super(description, httpCode)
    }
}

const customLevels = {
    levels: {
        trace: 5,
        debug: 4,
        info: 3,
        warn: 2,
        error: 1,
        fatal: 0,
    },
    colors: {
        trace: "white",
        debug: "green",
        info: "green",
        warn: "yellow",
        error: "red",
        fatal: "red",
    },
}

const formatter = winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.splat(),
    winston.format.printf((info) => {
        const { timestamp, level, message, ...meta } = info

        return `${timestamp} [${level}]: ${message} ${Object.keys(meta).length ? JSON.stringify(meta, null, 2) : ""}`
    })
)

const transport = new winston.transports.Console({
    format: formatter,
})

export const logger = winston.createLogger({
    levels: customLevels.levels,
    transports: transport,
})

winston.addColors(customLevels.colors)

export const catchAsync =
    (fn: RequestHandler): RequestHandler =>
    (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch((err) => next(err))
    }

export const validate = (schema: SchemaOptions) => celebrate(schema, { abortEarly: false }, { mode: Modes.FULL })

// for oauth state against CSRF
export const randString = () => {
    let randomString = ""
    const randomNumber = Math.floor(Math.random() * 10)
    for (let i = 0; i < 20 + randomNumber; i++) {
        randomString += String.fromCharCode(33 + Math.floor(Math.random() * 94))
    }
    return randomString
}

export const getFileType = (filename: string) => {
    return filename.split(/\//)[1]
}
