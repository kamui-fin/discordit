import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import Button from "../components/Button"
import styles from "../styles/index.module.scss"

const DragDrop = () => {
    const [files, setFiles] = useState([])
    const onDrop = useCallback((acceptedFiles) => {
        setFiles(acceptedFiles)
    }, [])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: {
            "image/*": [],
            "video/*": [],
        },
        onDrop,
    })
    return (
        <main className={styles.container}>
            <div {...getRootProps()} className={styles.dragdrop}>
                <input {...getInputProps()} />
                {isDragActive ? (
                    <p>Drop the files here ...</p>
                ) : (
                    <p>
                        Drag 'n' drop some files here, or click to select files
                    </p>
                )}
            </div>
            <div>
                <ul className={styles.listing}>
                    {files.map((file) => (
                        <li>{file.name}</li>
                    ))}
                </ul>
            </div>
            <Button text="Submit" />
        </main>
    )
}

export default DragDrop;
