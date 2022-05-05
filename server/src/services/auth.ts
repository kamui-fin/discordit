import axios from "axios"
import { gauth } from "../config"
import { UserModel } from "../models"

export const getGoogleOauthToken = async (code: string) => {
    const { tokens } = await gauth.getToken(code)
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

export const registerIfNotExists = async ({ id, email, name }) => {
    if (!(await UserModel.findOne({ userId: id }))) {
        const user = new UserModel({ userId: id, username: name, email })
        await user.save()
    }
}
