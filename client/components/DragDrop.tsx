import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import Button from "../components/Button"
import { http } from "../lib/axios"
import styles from "../styles/DragDrop.module.scss"

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
    const uploadAll = async () => {
        const formData = new FormData()
        formData.append("file", files[0])
        const res = await http.post("/media/upload", formData)
        const { fileId } = res
        const shortened = await http.post("/url/shorten", { fileId: 0 })
        console.log(shortened)
    }
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
            <Button onDone={uploadAll}>Submit</Button>
        </main>
    )
}

export default DragDrop
