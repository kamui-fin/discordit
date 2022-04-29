import axios from "axios"
import { URLSearchParams } from "url"
import { DISCORD_BASE_URL } from "../config"
import { DiscordUser, Tokens } from "../types"

export const getDiscordOauthToken = async (code: string): Promise<Tokens> => {
    const oauthResult = await axios.post(
        `${DISCORD_BASE_URL}/oauth2/token`,
        new URLSearchParams({
            client_id: process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID,
            client_secret: process.env.NEXT_PUBLIC_DISCORD_CLIENT_SECRET,
            code,
            grant_type: "authorization_code",
            redirect_uri: "http://localhost:3000/login?step=2",
            scope: "identify",
        }),
        {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        }
    )

    return oauthResult.data
}

export const getDiscordUser = async (tokens: Tokens): Promise<DiscordUser> => {
    const user = await axios.post(`${DISCORD_BASE_URL}/users/@me`, {
        headers: {
            Authorization: `${tokens.tokenType} ${tokens.accessToken}`,
        },
    })
    return user.data
}
