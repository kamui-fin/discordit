import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { http } from "../lib/axios"
import Button from "../components/Button"

const Login = () => {
    const router = useRouter()
    const { code } = router.query
    const [googleUrl, setGoogleUrl] = useState("")

    useEffect(() => {
        const fetchGoogleUrl = async () => {
            const url = (await http.get("/auth/google/url")).data.url
            setGoogleUrl(url)
        }
        fetchGoogleUrl()
    }, [])

    useEffect(() => {
        const authorizeGoogle = async () =>
            await http.post("/auth/google", { code })
        if (code) authorizeGoogle()
    }, [code])

    return (
        <Button>
            <a href={googleUrl}>Login</a>
        </Button>
    )
}

export default Login
