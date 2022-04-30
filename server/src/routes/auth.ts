import express from "express"
import { authController } from "../controllers"
import { authValidation } from "../validations"
import { validate } from "../utils"
import { onlyAuth } from "../middlewares/auth"

const router = express.Router()

router.post("/discord", validate(authValidation.oauth), authController.discordOauth)
router.post("/google", validate(authValidation.oauth), authController.googleOauth, onlyAuth)
router.get("/google/url", validate(authValidation.oauth), authController.generateGoogleAuthUrl)

export default router
