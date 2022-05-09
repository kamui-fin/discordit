import { useRouter } from "next/router"
import { http } from "../lib/axios"
import Button from "./Button"

const LogoutButton = () => {
    const router = useRouter()

    const logout = () => {
        const deleteSid = async () => {
            const res = await http.post("/auth/logout")
            if (res.status === 204) {
                router.push("/login")
            }
        }
        deleteSid()
    }

    return (
        <div>
            <Button onDone={logout}>Logout</Button>
        </div>
    )
}

export default LogoutButton
