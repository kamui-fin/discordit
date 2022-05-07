import express from "express"
import authRoute from "./auth"
import mediaRoute from "./media"

export const router = express.Router()
router.use("/auth", authRoute)
router.use("/media", mediaRoute)
