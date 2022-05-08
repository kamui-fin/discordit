import express from "express"
import { shortenFile } from "../controllers/file"
import { onlyAuth } from "../middlewares/auth"
import { Joi, Segments } from "celebrate"
import { validate } from "../utils"

const router = express.Router()

// only auth
router.post(
    "/shorten",
    validate({
        [Segments.BODY]: Joi.object().keys({
            fileId: Joi.string().required(),
            mimeType: Joi.string().required()
        }),
    }),
    shortenFile,
    onlyAuth
)

export default router
