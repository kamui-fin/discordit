import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import { http } from "../lib/axios"
import cx from "classnames"
import styles from "../styles/DragDrop.module.scss"
import ProgressBar from "./ProgressBar"
import { AiOutlineCloudUpload, AiOutlineFile } from "react-icons/ai"

enum Status {
    UPLOADING = "Uploading...",
    UPLOADED = "Uploaded",
    CANCELED = "Canceled",
    NO_FILE = "No file uploaded",
}

const getHumanReadableSize = (bytes) => {
    if (bytes == 0) {
        return "0.00 B"
    }
    const e = Math.floor(Math.log(bytes) / Math.log(1024))
    return (
        (bytes / Math.pow(1024, e)).toFixed(2) + " " + " KMGTP".charAt(e) + "B"
    )
}

const Uploading = ({ fileName, fileSize, progress, cancelReq, status }) => {
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
                    <AiOutlineFile className={styles.fileIcon} />
                    <div className={styles.fileInfo}>
                        <span>{fileName}</span>
                        <span className={styles.filesize}>
                            {getHumanReadableSize(fileSize)}
                        </span>
                    </div>
                </div>
            </ProgressBar>
        </>
    )
}

const DragDrop = () => {
    const [file, setFile] = useState(null)
    const [status, setStatus] = useState(Status.NO_FILE)
    const [uploadProgress, setUploadProgress] = useState(20)
    const controller = new AbortController()

    const onDrop = useCallback(async (acceptedFiles) => {
        const [uploadedFile] = acceptedFiles
        setFile(uploadedFile)
        setStatus(Status.UPLOADING)
        await upload(uploadedFile)
    }, [])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: {
            "image/*": [],
            "video/*": [],
        },
        maxFiles: 1,
        onDrop,
    })

    const onUploadProgress = (event) => {
        setUploadProgress(Math.round((100 * event.loaded) / event.total))
    }

    const upload = async (file) => {
        if (file) {
            const formData = new FormData()
            formData.append("file", file)
            const res = await http.post("/media/upload", formData, {
                signal: controller.signal,
                onUploadProgress,
            })
            const { id, mimetype } = res.data.data.id
            const shortened = await http.post("/file/shorten", {
                fileId: id,
                mimeType: mimetype,
            })
            console.log(shortened)
            setStatus(Status.UPLOADED)
        }
    }

    const cancel = () => {
        controller.abort()
        setStatus(Status.CANCELED)
    }

    return (
        <main className={styles.container}>
            <div className={styles.dragContainer}>
                <div className={styles.info}>
                    <h2 className={styles.heading}>Upload your media</h2>
                    <p className={styles.desc}>
                        Images, videos, and audio files are allowed
                    </p>
                </div>
                <div
                    {...getRootProps()}
                    className={cx(styles.dragdrop, {
                        [styles.active]: isDragActive,
                    })}
                >
                    <input {...getInputProps()} />
                    <AiOutlineCloudUpload className={styles.icon} />
                    {isDragActive ? (
                        <p className={styles.prompt}>Drop the file here</p>
                    ) : (
                        <p className={styles.prompt}>
                            Drag and drop or browse to choose a file
                        </p>
                    )}
                </div>
                {status !== Status.NO_FILE && (
                    <Uploading
                        fileName={file.name}
                        fileSize={file.size}
                        progress={uploadProgress}
                        cancelReq={cancel}
                        status={status}
                    />
                )}
            </div>
        </main>
    )
}

export default DragDrop
