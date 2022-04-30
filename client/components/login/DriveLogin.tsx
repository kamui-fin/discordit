import Button from "../Button"
import styles from "../../styles/DiscordLogin.module.scss"

const DriveLogin = ({ onDone, url }: { onDone?: () => void; url: string }) => {
    return (
        <div className={styles.container}>
            <h1>Next, sign in to Google Drive</h1>
            <h4 className={styles.subhead}>
                For storing uploaded media in a stable environment
            </h4>
            <a href={url}>
                <Button
                    type="primary"
                    text="Sign in with Google"
                    onDone={onDone}
                />
            </a>
        </div>
    )
}

export default DriveLogin
