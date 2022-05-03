import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import DiscordLogin from "../components/DiscordLogin"
import DriveLogin from "../components/DriveAuth"
import Timeline from "../components/Timeline"
import styles from "../styles/login.module.scss"
import axios from "axios"

const Login = () => {
    const router = useRouter()
    const { code, step = "1" } = router.query
    const [googleUrl, setGoogleUrl] = useState("")
    const numSteps = 2

    const getStep = () => Number.parseInt(step)

    useEffect(() => {
        const fetchGoogleUrl = async () => {
            const url = (
                await axios.get("http://localhost:8080/auth/google/url", {
                    withCredentials: true,
                })
            ).data.url
            setGoogleUrl(url)
        }
        fetchGoogleUrl()
    }, [])

    useEffect(() => {
        const loginWithDiscord = async () => {
            const user = (
                await axios.post(
                    "http://localhost:8080/auth/discord",
                    { code },
                    { withCredentials: true }
                )
            ).data
            window.localStorage.setItem("user", JSON.stringify(user))
        }
        const authorizeGoogle = async () => {
            await axios.post(
                "http://localhost:8080/auth/google",
                { code },
                { withCredentials: true }
            )
        }

        if (code) {
            if (getStep() === 1) {
                loginWithDiscord().then(() =>
                    router.push({ href: "/login", query: { step: 2 } })
                )
            } else if (getStep() === 2) {
                authorizeGoogle()
                router.push("/")
            }
        }
    }, [code])

    const steps = [
        <DiscordLogin onDone={() => {}} />,
        <DriveLogin url={googleUrl} />,
    ]
    return (
        <div className={styles.container}>
            <Timeline
                className={styles.timeline}
                length={numSteps}
                completedSteps={getStep()}
            />
            {steps[getStep() - 1]}
        </div>
    )
}

export default Login
