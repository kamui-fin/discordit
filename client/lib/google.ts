import { google } from "googleapis"

export const oauth2Client = new google.auth.OAuth2(
    process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
    "http://localhost:3000/login?step=2"
)

export const scopes = [
    ".../auth/photoslibrary",
    ".../auth/photoslibrary.appendonly",
    ".../auth/photoslibrary.sharing",
]
