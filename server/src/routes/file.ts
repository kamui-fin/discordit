import express from "express"
import { shortenFile } from "../controllers/file"
import { onlyAuth } from "../middlewares/auth"

const router = express.Router()

// only auth
router.post("/shorten", shortenFile, onlyAuth)

export default router
