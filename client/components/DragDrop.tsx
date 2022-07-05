import { useCallback, useMemo, useState } from "react"
import { useDropzone } from "react-dropzone"
import { http } from "../lib/axios"
import cx from "classnames"
import styles from "../styles/DragDrop.module.scss"
import { AiOutlineCloudUpload, AiOutlineFile } from "react-icons/ai"
import Uploading, { Status } from "./Uploading"
import { ISettings } from "../pages/settings"

interface Props {
    onDone: (url: string) => void
    settings: ISettings
}

const DragDrop = ({ onDone, settings }: Props) => {
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
                onDone(`http://localhost:3000/${shortened.data.shortened}`)
            } catch (e) {
                setStatus(Status.CANCELED)
                console.log("aborted", e)
            }
        }
    }

    const cancel = () => {
        controller.abort()
    }

    return (
        <div className={styles.container}>
            <div className={styles.dragContainer}>
                <div className={styles.info}>
                    <h2 className={styles.heading}>Upload your media</h2>
                    <p className={styles.desc}>Any type of file is accepted</p>
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
        </div>
    )
}

export default DragDrop
