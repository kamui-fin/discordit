import ProgressBar from "./ProgressBar"
import styles from "../styles/Uploading.module.scss"
import cx from "classnames"

export enum Status {
    UPLOADING = "Uploading...",
    UPLOADED = "Uploaded",
    CANCELED = "Canceled",
    NO_FILE = "No file uploaded",
}

const getHumanReadableSize = (bytes: number) => {
    if (bytes === 0) {
        return "0.00 B"
    }
    const e = Math.floor(Math.log(bytes) / Math.log(1024))
    return (
        (bytes / Math.pow(1024, e)).toFixed(2) + " " + " KMGTP".charAt(e) + "B"
    )
}

interface UploadProps {
    fileName: string
    fileSize: number
    progress: number
    cancelReq: () => void
    status: Status
}

const Uploading = ({
    fileName,
    fileSize,
    progress,
    cancelReq,
    status,
}: UploadProps) => {
    return (
        <>
            <div className={styles.uploadControl}>
                <p className={styles.statusText}>{status}</p>
                {status === Status.UPLOADING && (
                    <p
                        className={cx(styles.statusText, styles.cancel)}
                        onClick={cancelReq}
                    >
                        Cancel
                    </p>
                )}
            </div>
            <ProgressBar completed={progress}>
                <div className={styles.fileData}>
                    {/* <AiOutlineFile className={styles.fileIcon} /> */}
                    <div className={styles.fileInfo}>
                        <span>{fileName}</span>
                        <span className={styles.filesize}>
                            {getHumanReadableSize(fileSize)}
                        </span>
                    </div>
                </div>
                <div
                    className={cx(styles.fileData, styles.overlay)}
                    style={{ width: `${progress}%` }}
                >
                    {/* <AiOutlineFile className={styles.fileIcon} /> */}
                    <div className={styles.fileInfo}>
                        <span className={styles.colorWhite}>{fileName}</span>
                        <span
                            className={cx(styles.filesize, styles.colorWhite)}
                        >
                            {getHumanReadableSize(fileSize)}
                        </span>
                    </div>
                </div>
            </ProgressBar>
        </>
    )
}

export default Uploading
