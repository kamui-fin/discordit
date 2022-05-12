import { google } from "googleapis"
import { Credentials, OAuth2Client } from "google-auth-library"
import axios from "axios"
import { getClient } from "./auth"
import { UserModel } from "../models/user"
import { UploadedFile } from "express-fileupload"
import { ApiError, getFileType, logger } from "../utils"

export const createFolder = async (auth: OAuth2Client, name: string, parent?: string) => {
    const drive = google.drive({ version: "v3", auth })
    let query = `name = '${name}' and mimeType = 'application/vnd.google-apps.folder' and trashed = false`
    if (parent) {
        query += ` and '${parent}' in parents`
    }
    const listing = await drive.files.list({
        q: query,
        fields: "files(id)",
        spaces: "drive",
    })
    const fileList = listing.data.files
    if (fileList?.length) {
        return fileList[0].id
    }

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

export const uploadToDrive = async (tokens: Credentials, file: UploadedFile, appFolderId: string) => {
    // create parent if not exists
    const folderId = await createFolder(getClient(tokens), getFileType(file.mimetype), appFolderId)
    const resp = await axios.post(
        "https://www.googleapis.com/upload/drive/v3/files?uploadType=resumable",
        {
            parents: [folderId],
            name: file.name,
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

const getUserFolderId = async (userId: number) => {
    const user = await UserModel.findOne({ userId })
    return user?.folderId
}

export const uploadFile = async (userId: number, tokens: Credentials, file: UploadedFile) => {
    const folder = await getUserFolderId(userId)
    if (folder) {
        const res = await uploadToDrive(tokens, file, folder)
        return res
    }
}

export const driveDownloadFile = async (fileId: string, tokens: Credentials) => {
    const drive = google.drive({ version: "v3", auth: getClient(tokens) })
    const strm = await drive.files.get(
        {
            fileId: fileId,
            alt: "media",
        },
        { responseType: "stream" }
    )

    return strm.data
        .on("end", function () {
            logger.info("finished streaming data")
        })
        .on("error", function (err) {
            throw new ApiError(`error streaming data ${err}`)
        })
}
