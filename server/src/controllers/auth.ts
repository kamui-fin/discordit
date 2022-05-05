import { catchAsync } from "../utils"
import httpStatus from "http-status"
import { getGoogleOauthToken, getGoogleUser, registerIfNotExists } from "../services/auth"
import { gauth, scopes } from "../config"

export const googleOauth = catchAsync(async (req, res) => {
    // assumes already logged in
    // only authorization, not authentication
    const { code } = req.body
    const tokens = await getGoogleOauthToken(code)

    // save user to db
    const userInfo = await getGoogleUser(tokens)
    await registerIfNotExists(userInfo)

    req.session.tokens = tokens
    req.session.loggedIn = true
    // for some reason a manual save is required to persist google tokens
    req.session.save(function (err) {})
    res.status(httpStatus.OK).send(userInfo)
})

export const generateGoogleAuthUrl = catchAsync(async (req, res) => {
    const url = gauth.generateAuthUrl({
        // 'online' (default) or 'offline' (gets refresh_token)
        access_type: "online",
        scope: scopes,
    })
    res.status(httpStatus.OK).send({ url })
})

export const logout = catchAsync(async (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            throw err()
        }
        res.status(httpStatus.NO_CONTENT).send()
    })
})
