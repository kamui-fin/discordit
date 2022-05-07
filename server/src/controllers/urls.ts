import httpStatus from "http-status"
import { convertToOriginal, insertUrl } from "../services/urls"
import { catchAsync } from "../utils"

export const shortenUrl = catchAsync(async (req, res) => {
    const { originalUrl } = req.body
    const shortened = await insertUrl(originalUrl)
    res.status(httpStatus.CREATED).send({
        ok: true,
        shortened,
    })
})

export const readMedia = catchAsync(async (req, res) => {
    const { hash } = req.params
    const originalLink = await convertToOriginal(hash)
    res.status(httpStatus.TEMPORARY_REDIRECT).redirect(originalLink)
})
