import express from "express"
import { readMedia } from "../controllers/media"
import authRoute from "./auth"
import mediaRoute from "./media"
import fileRoute from "./file"

export const router = express.Router()
router.use("/auth", authRoute)
router.use("/media", mediaRoute)
router.use("/file", fileRoute)

router.use("/:hash", readMedia)
