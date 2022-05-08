import express from "express"
import { googleOauth, generateGoogleAuthUrl } from "../controllers/auth"
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

router.get("/google/url", generateGoogleAuthUrl)

export default router
