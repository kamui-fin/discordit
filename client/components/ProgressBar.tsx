import styles from "../styles/ProgressBar.module.scss"

const ProgressBar = ({ completed, children }) => {
    return (
        <div className={styles.progressContainer}>
            <div
                className={styles.completed}
                style={{ width: `${completed}%` }}
            >
                {children}
            </div>
        </div>
    )
}

export default ProgressBar
