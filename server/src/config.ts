import crypto from "crypto"
import dotenv from "dotenv"
import { SessionOptions } from "express-session"

dotenv.config()

export const {
    NODE_ENV = "development",
    APP_PORT = 3000,
    APP_SECRET = crypto.randomBytes(32).toString("base64"),
    SESSION_COOKIE = "sid",
    REDIS_URI = "redis://localhost:6379",
} = process.env

const ONE_HOUR_MS = 1_000 * 60 * 60
const ONE_WEEK_MS = 7 * 24 * ONE_HOUR_MS
const ONE_MONTH_MS = ONE_WEEK_MS * 30

export const SESSION_OPTS: SessionOptions = {
    name: SESSION_COOKIE,
    secret: APP_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        httpOnly: false,
        maxAge: ONE_MONTH_MS,
    },
}

export const DISCORD_BASE_URL = "https://discord.com/api"
