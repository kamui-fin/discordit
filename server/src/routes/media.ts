import express from "express"
import { mediaController } from "../controllers"
import { onlyAuth } from "../middlewares/auth"

const router = express.Router()

router.post("/upload", mediaController.upload, onlyAuth)
// router.get("/:id", mediaController.getInfo, onlyAuth)

export default router
