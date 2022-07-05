import express from "express"
import { getUserData, googleOauth, logout, saveSettings } from "../controllers/auth"
import { validate } from "../utils"
import { onlyAuth } from "../middlewares/auth"
import { Joi, Segments } from "celebrate"

const router = express.Router()

router.post(
    "/google",
    validate({
        [Segments.BODY]: Joi.object().keys({
            code: Joi.string().required(),
        }),
    }),
    googleOauth,
    onlyAuth
)

router.post("/logout", logout, onlyAuth)
router.get("/me", getUserData, onlyAuth)
router.post("/settings/save", saveSettings, onlyAuth)

export default router
