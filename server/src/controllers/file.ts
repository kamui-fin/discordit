import { CREATED } from "http-status"
import { UserModel } from "../models/user"
import { insertFile } from "../services/file"
import { catchAsync } from "../utils"
import { DateTime } from "luxon"

export const shortenFile = catchAsync(async (req, res) => {
    const { fileId, mimeType } = req.body
    // guarenteed to be logged in b/c of middleware
    const { userId } = req.session
    // check if expire setting exists
    const { settings } = await UserModel.findOne({ userId })
    const { daysExpiry, hoursExpiry, minutesExpiry } = settings

    let expireDate: DateTime | undefined
    if (daysExpiry && hoursExpiry && minutesExpiry) {
        expireDate = DateTime.now().plus({ days: daysExpiry, hours: hoursExpiry, minutes: minutesExpiry })
    }
    const shortened = await insertFile(userId!, fileId, mimeType, expireDate)

    res.status(CREATED).send({
        ok: true,
        shortened,
    })
})
