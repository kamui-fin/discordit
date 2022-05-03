import express from "express"
import { discordController } from "../controllers"

const router = express.Router()

router.get("/channels", discordController.getChannels)

export default router
