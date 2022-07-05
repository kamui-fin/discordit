import { catchAsync } from "../utils"
import { CREATED, NO_CONTENT, OK } from "http-status"
import { getClient, getGoogleOauthToken, getGoogleUser, registerIfNotExists, saveUserSettings } from "../services/auth"
import { createFolder } from "../services/media"
import { UserModel } from "../models/user"

export const googleOauth = catchAsync(async (req, res) => {
    // assumes already logged in
    // only authorization, not authentication
    const { code } = req.body
    const tokens = await getGoogleOauthToken(code)
    // TODO: handle invalid refresh token due to removal of perms

    // setup their folder
    const folderId = await createFolder(getClient(tokens), "shareit")

    // save user to db
    const userInfo = await getGoogleUser(tokens)
    await registerIfNotExists({ folderId, refreshToken: tokens.refresh_token, ...userInfo })

    req.session.tokens = { ...tokens, ...(!tokens.refresh_token && { refresh_token: userInfo.refreshToken }) }
    req.session.userId = Number.parseInt(userInfo.id)
    req.session.loggedIn = true
    // for some reason a manual save is required to persist google tokens
    req.session.save()
    res.status(OK).send(userInfo)
})

export const logout = catchAsync(async (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            throw err()
        }
        res.status(NO_CONTENT).clearCookie("sid").send()
    })
})

export const getUserData = catchAsync(async (req, res) => {
    const user = await UserModel.findOne({ userId: req.session.userId })
    res.status(OK).send(user)
})

export const saveSettings = catchAsync(async (req, res) => {
    await saveUserSettings(req.body, req.session.userId)
    res.status(OK)
})
