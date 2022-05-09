import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import Button from "../components/Button"
import { http } from "../lib/axios"
import styles from "../styles/DragDrop.module.scss"

const DragDrop = () => {
    const [file, setFile] = useState(null)
    const onDrop = useCallback((acceptedFiles) => {
        setFile(acceptedFiles[0])
    }, [])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: {
            "image/*": [],
            "video/*": [],
        },
        maxFiles: 1,
        onDrop,
    })
    const upload = async () => {
        if (file) {
            // const formData = new FormData()
            // formData.append("file", file)
            // const res = await http.post("/media/upload", formData)
            // const fileId = res.data.data.id
            const shortened = await http.post("/file/shorten", { fileId: "1xFcmBB1FpdlN_5akeJKnPZEoKcUtUWzS", mimeType: "image/jpeg" })
            console.log(shortened)
        }
    }
    return (
        <main className={styles.container}>
            <div {...getRootProps()} className={styles.dragdrop}>
                <input {...getInputProps()} />
                {isDragActive ? (
                    <p>Drop the file here ...</p>
                ) : (
                    <p>
                        Drag 'n' drop some file here, or click to select a file
                    </p>
                )}
            </div>
            {file && <p>{file.name}</p>}
            <Button onDone={upload}>Submit</Button>
        </main>
    )
}

export default DragDrop
