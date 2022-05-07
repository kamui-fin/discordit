import express from "express"
import { shortenUrl, readMedia } from "../controllers/urls"
import { onlyAuth } from "../middlewares/auth"

const router = express.Router()

// only auth
router.post("/url/shorten", shortenUrl)
router.get("/:hash", readMedia)

export default router
