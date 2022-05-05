import cx from "classnames"
import styles from "../styles/Button.module.scss"

const Button = ({
    type = "primary",
    children,
    className,
    icon,
    onDone,
}: {
    type: string
    children: React.ReactElement
    className: string
    icon?: React.ReactElement
    onDone?: () => void
}) => {
    // TODO: implement icon
    const typeMap: { [key: string]: string } = {
        primary: styles.primary,
    }
    return (
        <button
            className={cx(styles.button, className, typeMap[type])}
            onClick={onDone}
        >
            {children}
        </button>
    )
}

export default Button
