import styles from "../styles/CopyUrl.module.scss"
import Button from "./Button"

const CopyUrl = ({ link }) => {
    const copy = () => {
        navigator.clipboard.writeText(link)
    }
    return (
        <div className={styles.container}>
            <span className={styles.link}>{link}</span>
            <Button onDone={copy}>Copy</Button>
        </div>
    )
}

export default CopyUrl
