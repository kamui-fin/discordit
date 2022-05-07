import { uploadFiles } from "../services/media"
import { catchAsync } from "../utils"

export const upload = catchAsync(async (req, res) => {
    try {
        if (!req.files) {
            res.send({
                ok: false,
                msg: "No file uploaded",
            })
        } else {
            await uploadFiles(req.session.userId, req.session.tokens, req.files)
            res.send({
                ok: true,
                msg: "File is uploaded",
            })
        }
    } catch (err) {
        res.status(500).send(err)
    }
})
