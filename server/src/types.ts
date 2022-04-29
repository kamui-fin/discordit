export type Tokens = {
    access_token: string
    token_type: string
    expires_in: number
    refresh_token: string
    scope: string
}

export type DiscordUser = {
    id: string
    username: string
    avatar: string
}
