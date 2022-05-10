import { Credentials } from "google-auth-library"
import { withTokensById } from "../services/auth"
import { convertToOriginal } from "../services/file"
import { driveDownloadFile, uploadFile } from "../services/media"
import { ApiError, catchAsync } from "../utils"
import { BAD_REQUEST, NOT_FOUND } from "http-status"

export const upload = catchAsync(async (req, res) => {
    if (!req.files) {
        throw new ApiError("no file supplied", BAD_REQUEST)
    } else {
        const { userId, tokens } = req.session
        const [file] = Object.values(req.files)
        if (Array.isArray(file)) {
            throw new ApiError("must only supply 1 file", BAD_REQUEST)
        } else {
            const data = await uploadFile(userId!, tokens!, file)
            res.send({
                ok: true,
                msg: "uploaded file",
                data,
            })
        }
    }
})

export const readMedia = catchAsync(async (req, res) => {
    const { hash } = req.params
    const file = await convertToOriginal(hash)
    if (!file) {
        throw new ApiError("could not find file", NOT_FOUND)
    } else {
        res.set("Content-Type", file.mimeType)

        withTokensById(file.userId, async (tokens: Credentials) => {
            const readable = await driveDownloadFile(file.fileId, tokens)
            readable.pipe(res)
        })
    }
})
