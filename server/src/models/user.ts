import { Schema, model } from "mongoose"

export interface IUser {
    username: string
    email?: string
}

const schema = new Schema<IUser>(
    {
        username: { type: String, required: true },
        email: {
            type: String,
            unique: true,
            trim: true,
            lowercase: true,
        },
    },
    { timestamps: true }
)

export const UserModel = model<IUser>("User", schema)
