import { useState } from "react"
import DiscordLogin from "../components/login/DiscordLogin"
import DriveLogin from "../components/login/DriveLogin"
import Timeline from "../components/Timeline"
import styles from "../styles/login.module.scss"

const Login = () => {
    const numSteps = 2
    const steps = [<DiscordLogin onDone={() => advance()} />, <DriveLogin />]
    const [currStep, setCurrStep] = useState(1)
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
