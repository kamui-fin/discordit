import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import DiscordLogin from "../components/login/DiscordLogin"
import DriveLogin from "../components/login/DriveLogin"
import Timeline from "../components/Timeline"
import styles from "../styles/login.module.scss"
import axios from "axios"

const Login = () => {
    const router = useRouter()
    const { code } = router.query
    const [googleUrl, setGoogleUrl] = useState("")

    useEffect(() => {
        const fetchGoogleUrl = async (): Promise<string> => {
            const url = (
                await axios.get("http://localhost:8080/auth/google/url")
            ).data.url
            setGoogleUrl(url)
        }
        fetchGoogleUrl()
    }, [])

    useEffect(() => {
        // discord login
        // google authorization
    }, [code])

    const numSteps = 2
    const [currStep, setCurrStep] = useState(
        Number.parseInt(router.query.step || "1")
    )

    const steps = [
        <DiscordLogin onDone={() => {}} />,
        <DriveLogin url={googleUrl} />,
    ]
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
