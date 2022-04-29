export type Tokens = {
    accessToken: string
    tokenType: string
    expiresIn: number
    refreshToken: string
    scope: string
}

export type DiscordUser = {
    id: string
    username: string
    avatar: string
}
