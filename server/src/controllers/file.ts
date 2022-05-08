import httpStatus from "http-status"
import { insertFile } from "../services/file"
import { catchAsync } from "../utils"

export const shortenFile = catchAsync(async (req, res) => {
    const { fileId, mimeType } = req.body
    // guarenteed to be logged in b/c of middleware
    const {userId} = req.session
    const shortened = await insertFile(userId!, fileId, mimeType)

    res.status(httpStatus.CREATED).send({
        ok: true,
        shortened,
    })
})
