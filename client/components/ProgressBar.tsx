import styles from "../styles/ProgressBar.module.scss"

const ProgressBar = ({ completed, children }) => {
    return (
        <div className={styles.progressContainer}>
            <div
                className={styles.completed}
                style={{ width: `${completed}%` }}
            ></div>
            {children}
        </div>
    )
}

export default ProgressBar
