import connectRedis from "connect-redis"
import session from "express-session"
import mongoose from "mongoose"
import { createClient } from "redis"
import { MONGO_URI, REDIS_URI, SESSION_OPTS } from "./config"

export const connectDb = async () => {
    await mongoose.connect(MONGO_URI)
}

export const AutoIncrement = require("mongoose-sequence")(mongoose)

const redisClient = createClient({
    legacyMode: true,
    url: REDIS_URI,
})

redisClient.on("error", (err) => {
    console.log("Could not establish a connection with redis. " + err)
})
redisClient.on("connect", () => {
    console.log("Connected to redis successfully")
})

const RedisStore = connectRedis(session)
export const store = new RedisStore({ client: redisClient })

export const startSession = async () => {
    await redisClient.connect()
    return session({
        store,
        ...SESSION_OPTS,
    })
}
