import express from "express"
import { upload } from "../controllers/media"
import { onlyAuth } from "../middlewares/auth"

const router = express.Router()

router.post("/upload", upload, onlyAuth)

export default router
