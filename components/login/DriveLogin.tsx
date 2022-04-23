import Button from "../Button"
import styles from "../../styles/DiscordLogin.module.scss"

const DriveLogin = ({ onDone }: { onDone?: () => void }) => (
    <div className={styles.container}>
        <h1>Next, sign in to Google Drive</h1>
        <h4 className={styles.subhead}>
            For storing uploaded media in a stable environment
        </h4>
        <Button type="primary" text="Sign in with Google" onDone={onDone} />
    </div>
)

export default DriveLogin
