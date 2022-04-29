import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import DiscordLogin from "../components/login/DiscordLogin"
import DriveLogin from "../components/login/DriveLogin"
import Timeline from "../components/Timeline"
import styles from "../styles/login.module.scss"
import axios from "axios"
import { oauth2Client } from "../lib/google"


const Login = () => {
    // handle OAuth
    const router = useRouter()
    const { code, step } = router.query
    useEffect(() => {
        const getDiscordOauthToken = async () => {
            const oauthResult = await axios.post(
                "https://discord.com/api/oauth2/token",
                new URLSearchParams({
                    client_id: process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID,
                    client_secret:
                        process.env.NEXT_PUBLIC_DISCORD_CLIENT_SECRET,
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

            const oauthData = oauthResult.data
            // save for now
            window.localStorage.setItem("discordToken", oauthData.access_token)
        }

        const getGoogleOauthToken = async () => {
            const { tokens } = await oauth2Client.getToken(code)
            console.log(tokens)
            oauth2Client.setCredentials(tokens)
            window.localStorage.setItem("googleToken", tokens.access_token)
        }

        if (code) {
            try {
                if (currStep == 1) {
                    getDiscordOauthToken()
                    advance()
                } else if (currStep == 2) {
                    getGoogleOauthToken()
                }
            } catch (error) {
                console.error(error)
            }
        }
    }, [code])

    const numSteps = 2
    const steps = [<DiscordLogin onDone={() => {}} />, <DriveLogin />]
    const [currStep, setCurrStep] = useState(Number.parseInt(step) || 1)
    const advance = () => {
        if (currStep < numSteps) {
            setCurrStep(currStep + 1)
        }
    }
    return (
        <div className={styles.container}>
            <Timeline
                className={styles.timeline}
                length={numSteps}
                completedSteps={currStep}
            />
            {steps[currStep - 1]}
        </div>
    )
}

export default Login
