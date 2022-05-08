import { catchAsync } from "../utils"
import { NO_CONTENT, OK } from "http-status"
import { getClient, getGoogleOauthToken, getGoogleUser, registerIfNotExists } from "../services/auth"
import { SCOPES } from "../config"
import { createFolder } from "../services/media"

export const googleOauth = catchAsync(async (req, res) => {
    // assumes already logged in
    // only authorization, not authentication
    const { code } = req.body
    const tokens = await getGoogleOauthToken(code)

    // setup their folder
    const folderId = await createFolder(getClient(tokens), "discordit")

    // save user to db
    const userInfo = await getGoogleUser(tokens)
    await registerIfNotExists({ folderId, ...userInfo })

    req.session.tokens = tokens
    req.session.userId = userInfo.id
    req.session.loggedIn = true
    // for some reason a manual save is required to persist google tokens
    req.session.save()
    res.status(OK).send(userInfo)
})

export const generateGoogleAuthUrl = catchAsync(async (_, res) => {
    const url = getClient().generateAuthUrl({
        // 'online' (default) or 'offline' (gets refresh_token)
        access_type: "online",
        scope: SCOPES,
    })
    res.status(OK).send({ url })
})

export const logout = catchAsync(async (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            throw err()
        }
        res.status(NO_CONTENT).send()
    })
})
