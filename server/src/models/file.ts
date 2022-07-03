import { Schema, model } from "mongoose"
import { AutoIncrement } from "../db"

export interface File {
    userId: number
    fileId: string
    mimeType: string
    seq: number
    expiresAt: Date
}

const schema = new Schema<File>({
    userId: { type: Number, required: true },
    fileId: { type: String, required: true },
    mimeType: { type: String, required: true },
    expiresAt: Date,
})

schema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 })
schema.plugin(AutoIncrement, { inc_field: "seq" })

export const FileModel = model<File>("File", schema)
