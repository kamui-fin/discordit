import { catchAsync } from "../utils"
import httpStatus from "http-status"
import { getDiscordOauthToken, getDiscordUser } from "../services/oauth"

export const discordOauth = catchAsync(async (req, res) => {
    const { code } = req.body
    const tokens = await getDiscordOauthToken(code)
    const user = await getDiscordUser(tokens)
    req.session.userId = user.id
    res.status(httpStatus.CREATED).send(user)
})

export const logout = catchAsync(async (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            throw err()
        }
        res.status(httpStatus.NO_CONTENT).send()
    })
})
