import { Schema, model } from "mongoose"
import { AutoIncrement } from "../db"

export interface Link {
    originalLink: string
}

const schema = new Schema<Link>({
    originalLink: { type: String, required: true },
})

schema.plugin(AutoIncrement, { inc_field: "seq" })

export const LinkModel = model<Link>("Link", schema)
