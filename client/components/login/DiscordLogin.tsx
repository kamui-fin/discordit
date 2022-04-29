import Button from "../Button"
import styles from "../../styles/DiscordLogin.module.scss"

const DiscordLogin = ({ onDone }: { onDone?: () => void }) => {
    return (
        <div className={styles.container}>
            <h1>Welcome! First things first...</h1>
            <h4 className={styles.subhead}>
                Login with discord for posting functionality
            </h4>
            <a href="https://discord.com/api/oauth2/authorize?client_id=967594643611058276&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Flogin%3Fstep%3D2&response_type=code&scope=identify">
                <Button
                    type="primary"
                    text="Sign in with Discord"
                    onDone={onDone}
                />
            </a>
        </div>
    )
}

export default DiscordLogin
