import { Schema, model } from "mongoose"

export interface ISettings {
    maximumSpace: number; // in mb
    enableCompression: boolean;
    daysExpiry: number;
    hoursExpiry: number;
    minutesExpiry: number;
}

export interface IUser {
    userId: number
    username: string
    email: string
    folderId: string
    refreshToken: string
    settings: ISettings
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
        refreshToken: String,
        settings: {
            maximumSpace: Number, // in mb
            enableCompression: Boolean,
            daysExpiry: Number,
            hoursExpiry: Number,
            minutesExpiry: Number,
        },
    },
    { timestamps: true }
)

export const UserModel = model<IUser>("User", schema)
