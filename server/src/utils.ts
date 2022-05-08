import { celebrate, Modes, SchemaOptions } from "celebrate"
import { RequestHandler } from "express"

export class ApiError extends Error {
    public statusCode: number

    constructor(statusCode: number, message: string) {
        super(message)
        this.statusCode = statusCode
    }
}

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
