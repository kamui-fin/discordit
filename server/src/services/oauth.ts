import { gauth } from "../config"

export const getGoogleOauthToken = async (code: string) => {
    const { tokens } = await gauth.getToken(code)
    return tokens
}
