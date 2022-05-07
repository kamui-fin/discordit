import mongoose from "mongoose"
import { MONGO_URI } from "./config"

export const connectDb = async () => {
    await mongoose.connect(MONGO_URI)
}

export const AutoIncrement = require("mongoose-sequence")(mongoose)
