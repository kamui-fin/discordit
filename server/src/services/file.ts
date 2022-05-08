import { FileModel } from "../models/file"

const ALPHABET = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
const BASE = ALPHABET.length

const reverseString = (str: string): string => {
    return str.split("").reverse().join("")
}

export const encodeBase62 = (num: number): string => {
    let res = ""
    while (num > 0) {
        console.log(num)
        res += ALPHABET.charAt(num % BASE)
        num = Math.floor(num / BASE)
    }
    return reverseString(res)
}

export const decodeBase62 = (str: string): number => {
    let res = 0
    for (let i = 0; i < str.length; i++) {
        res = res * BASE + ALPHABET.indexOf(str.charAt(i))
    }
    return res
}

// returns shortened version
export const insertFile = async (userId: number, fileId: string, mimeType: string): Promise<string> => {
    const file = new FileModel({ userId, fileId, mimeType })
    await file.save()
    return encodeBase62(file.seq)
}

export const convertToOriginal = async (shortened: string) => {
    const file = await FileModel.findOne({ seq: decodeBase62(shortened) })
    return file
}
