import session from "express-session"
import { Credentials } from "google-auth-library"

declare module "express-session" {
    export interface SessionData {
        userId?: number
        loggedIn?: boolean
        tokens?: Credentials
    }
}
