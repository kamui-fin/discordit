import express from "express"
import authRoute from "./oauth"

export const router = express.Router()
router.use("/auth", authRoute)
