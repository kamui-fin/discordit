import { Schema, model } from "mongoose"

export interface IUser {
    userId: number
    username: string
    email: string
    folderId: string
}

const schema = new Schema<IUser>(
    {
        userId: { type: Number, required: true },
        username: { type: String, required: true },
        email: {
            type: String,
            unique: true,
            trim: true,
            lowercase: true,
            required: true,
        },
        folderId: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
)

export const UserModel = model<IUser>("User", schema)
