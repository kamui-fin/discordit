import express from "express"
import { googleOauth, generateGoogleAuthUrl } from "../controllers/auth"
import { oauth } from "../validations/auth"
import { validate } from "../utils"
import { onlyAuth } from "../middlewares/auth"

const router = express.Router()

router.post("/google", validate(oauth), googleOauth, onlyAuth)
router.get("/google/url", validate(oauth), generateGoogleAuthUrl)

export default router
