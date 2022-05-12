import { useCallback, useMemo, useState } from "react"
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
                <div className={cx(styles.fileData, styles.overlay)}
                    style={{ width: `${progress}%`}}
                >
                    {/* <AiOutlineFile className={styles.fileIcon} /> */}
                    <div className={styles.fileInfo}>
                        <span className={styles.colorWhite}>{fileName}</span>
                        <span className={cx(styles.filesize, styles.colorWhite)}>
                            {getHumanReadableSize(fileSize)}
                        </span>
                    </div>
                </div>
            </ProgressBar>
        </>
    )
}

const DragDrop = () => {
    const [file, setFile] = useState<File>()
    const [status, setStatus] = useState(Status.NO_FILE)
    const [uploadProgress, setUploadProgress] = useState(0)
    const controller = useMemo(() => new AbortController(), [])

    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        const [uploadedFile] = acceptedFiles
        setFile(uploadedFile)
        setUploadProgress(0)
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

    const onUploadProgress = (event: ProgressEvent) => {
        setUploadProgress(Math.round((100 * event.loaded) / event.total))
    }

    const upload = async (file: File) => {
        if (file) {
            const formData = new FormData()
            formData.append("file", file)
            try {
                const res = await http.post("/media/upload", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                    signal: controller.signal,
                    onUploadProgress,
                })
                const { id, mimeType } = res.data.data
                const shortened = await http.post("/file/shorten", {
                    fileId: id,
                    mimeType,
                })
                setStatus(Status.UPLOADED)
                console.log(shortened)
            } catch(e) {
                setStatus(Status.CANCELED)
                console.log("aborted", e)
            }
        }
    }

    const cancel = () => {
        controller.abort()
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
                {status !== Status.NO_FILE && file && (
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
