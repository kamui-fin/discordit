import { google } from "googleapis"
import { OAuth2Client } from "google-auth-library"
import axios from "axios"
import { getClient } from "./auth"
import { UserModel } from "../models"

export const getFileType = (filename: string) => {
    return filename.split(/\//)[1]
}

export const createFolder = async (auth: OAuth2Client, name: string, parent?) => {
    const drive = google.drive({ version: "v3", auth })

    const fileMetadata = {
        name,
        mimeType: "application/vnd.google-apps.folder",
        ...(parent && { parents: [parent] }),
    }

    const res = await drive.files.create({
        fields: "id",
        requestBody: fileMetadata,
    })
    return res.data.id
}

export const uploadFile = async (tokens, file, appFolderId) => {
    // create parent if not exists
    const folderId = createFolder(getClient(tokens), getFileType(file.mimetype), appFolderId)
    const resp = await axios.post(
        "https://www.googleapis.com/upload/drive/v3/files?uploadType=resumable",
        {
            parents: [folderId],
        },
        {
            headers: {
                Authorization: `Bearer ${tokens.access_token}`,
                "X-Upload-Content-Type": file.mimetype,
            },
        }
    )

    const resumableURI = resp.headers.location
    const res = await axios.post(resumableURI, file.data, {
        headers: {
            "Content-Length": file.size,
        },
    })
    return res.data
}

const getUserFolderId = async (userId) => {
    const { folderId } = await UserModel.find({ userId })
    return folderId
}

export const uploadFiles = async (id, tokens, files) => {
    const folder = await getUserFolderId(id)
    Object.values(files).map(async (file) => {
        const res = await uploadFile(tokens, file, folder)
    })
}
