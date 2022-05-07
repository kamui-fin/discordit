import axios from "axios"
import { google } from "googleapis"
import { UserModel } from "../models"

export const getGoogleOauthToken = async (code: string) => {
    const { tokens } = await getClient().getToken(code)
    return tokens
}

export const getGoogleUser = async (tokens) => {
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

export const getClient = (tokens?) => {
    const oAuth2Client = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        "http://localhost:3000/"
    )
    if (tokens) {
        oAuth2Client.setCredentials(tokens)
    }
    return oAuth2Client
}
