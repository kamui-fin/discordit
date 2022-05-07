import { Schema, model } from "mongoose"

export interface IUser {
    userId: string
    username: string
    email?: string
    folderId?: string
}

const schema = new Schema<IUser>(
    {
        userId: { type: String, required: true },
        username: { type: String, required: true },
        email: {
            type: String,
            unique: true,
            trim: true,
            lowercase: true,
        },
        folderId: {
            type: String,
        },
    },
    { timestamps: true }
)

export const UserModel = model<IUser>("User", schema)
