import cx from "classnames"
import styles from "../styles/Button.module.scss"

interface Props {
    children: React.ReactChild
    type?: string
    className?: string
    onDone?: () => void
}

const Button = ({
    type = "primary",
    children,
    className = "",
    onDone,
}: Props) => {
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
