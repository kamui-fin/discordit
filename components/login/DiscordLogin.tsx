import Button from "../Button"
import styles from "../../styles/DiscordLogin.module.scss"

const DiscordLogin = ({ onDone }: { onDone?: () => void }) => (
    <div className={styles.container}>
        <h1>Welcome! First things first...</h1>
        <h4 className={styles.subhead}>
            Login with discord for posting functionality
        </h4>
        <Button type="primary" text="Sign in with Discord" onDone={onDone} />
    </div>
)

export default DiscordLogin
