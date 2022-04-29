import express from "express"
import authRoute from "./auth"

export const router = express.Router()
router.use("/auth", authRoute)
