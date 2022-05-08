import { google } from "googleapis"
import { Credentials } from "google-auth-library"
import { getClient, withTokensById } from "../services/auth"
import { convertToOriginal } from "../services/file"
import { uploadFile } from "../services/media"
import { catchAsync } from "../utils"

export const upload = catchAsync(async (req, res) => {
    if (!req.files) {
        res.send({
            ok: false,
            msg: "no file supplied",
        })
    } else {
        const { userId, tokens } = req.session
        const [file] = Object.values(req.files)
        if (Array.isArray(file)) {
            res.send({
                ok: false,
                msg: "only 1 file must be supplied",
            })
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
        res.status(404).send({
            ok: false,
            msg: "could not find file",
        })
    } else {
        res.set("Content-Type", file.mimeType)

        withTokensById(file.userId, async (tokens: Credentials) => {
            const drive = google.drive({ version: "v3", auth: getClient(tokens) })
            const strm = await drive.files.get(
                {
                    fileId: file.fileId,
                    alt: "media",
                },
                { responseType: "stream" }
            )

            strm.data
                .on("end", function () {
                    console.log("Done")
                })
                .on("error", function (err) {
                    console.log("Error during download", err)
                })
                .pipe(res)
        })
    }
})
