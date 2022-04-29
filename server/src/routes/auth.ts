import express from "express"
import { authController } from "../controllers"
import { authValidation } from "../validations"
import { validate } from "../utils"

const router = express.Router()

router.post("/discord", validate(authValidation.oauth), authController.discordOauth)

export default router
