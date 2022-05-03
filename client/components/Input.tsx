import styles from '../styles/Input.module.scss'
import cx from "classnames"

const Input = ({className}) => {
    return <input className={cx(styles.input, className)} />
}

export default Input
