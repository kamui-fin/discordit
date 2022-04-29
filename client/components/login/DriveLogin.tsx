import Button from "../Button"
import styles from "../../styles/DiscordLogin.module.scss"
import { oauth2Client, scopes } from "../../lib/google"

const DriveLogin = ({ onDone }: { onDone?: () => void }) => {
    const url = oauth2Client.generateAuthUrl({
        // 'online' (default) or 'offline' (gets refresh_token)
        access_type: "online",
        scope: scopes,
    })
    console.log(url)
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
