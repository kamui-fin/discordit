import cx from "classnames"
import styles from "../styles/Button.module.scss"

const Button = ({
    type,
    text,
    icon,
    onDone,
}: {
    type: string
    text: string
    icon?: React.ReactElement
    onDone?: () => void
}) => {
    // TODO: implement icon
    const typeMap: { [key: string]: string } = {
        primary: styles.primary,
    }
    return (
        <button className={cx(styles.button, typeMap[type])} onClick={onDone}>
            {text}
        </button>
    )
}

export default Button
