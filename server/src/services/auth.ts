import axios from "axios"
import { store } from "../db"
import { google } from "googleapis"
import { UserModel } from "../models/user"
import { Credentials } from "google-auth-library"
import { SessionData } from "express-session"
import { FRONTEND_URL } from "../config"

export const getGoogleOauthToken = async (code: string) => {
    const { tokens } = await getClient().getToken(code)
    return tokens
}

export const getGoogleUser = async (tokens: Credentials) => {
    return (
        await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokens.access_token}`, {
            headers: {
                Authorization: `Bearer ${tokens.id_token}`,
            },
        })
    ).data
}

export const registerIfNotExists = async ({ id, email, name, folderId }) => {
    if (!(await UserModel.findOne({ userId: id }))) {
        const user = new UserModel({ userId: id, username: name, email, folderId })
        await user.save()
    }
}

export const getClient = (tokens?: Credentials) => {
    const oAuth2Client = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        `${FRONTEND_URL}/login`
    )
    if (tokens) {
        oAuth2Client.setCredentials(tokens)
    }
    return oAuth2Client
}

export const withTokensById = async (userId: number, cb: (tokens: Credentials) => void) => {
    store.all?.((error, sessions) => {
        if (error) throw error
        if (sessions) {
            const { tokens } = (sessions as any[]).find((session: SessionData) => {
                return session.userId === userId
            })
            if (tokens) {
                cb(tokens)
            }
        }
    })
}
