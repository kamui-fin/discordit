import express from "express"
import authRoute from "./auth"
import mediaRoute from "./media"
import urlRoute from "./urls"

export const router = express.Router()
router.use("/auth", authRoute)
router.use("/media", mediaRoute)
router.use("/", urlRoute)
