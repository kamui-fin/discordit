import { catchAsync } from "../utils"
import httpStatus from "http-status"
import { getDiscordOauthToken, getDiscordUser, getGoogleOauthToken } from "../services/oauth"
import { gauth, scopes } from "../config"

export const discordOauth = catchAsync(async (req, res) => {
    const { code } = req.body
    const tokens = await getDiscordOauthToken(code)
    const user = await getDiscordUser(tokens)
    req.session.loggedIn = true
    req.session.discordTokens = tokens
    res.status(httpStatus.CREATED).send(user)
})

export const googleOauth = catchAsync(async (req, res) => {
    // assumes already logged in
    // only authorization, not authentication
    const { code } = req.body
    const tokens = await getGoogleOauthToken(code)
    req.session.googleTokens = tokens
    // for some reason a manual save is required to persist google tokens
    req.session.save(function (err) {})
    res.status(httpStatus.OK)
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
