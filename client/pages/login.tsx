import { GetServerSidePropsContext, NextPage } from "next"
import styles from "../styles/login.module.scss"
import { useEffect } from "react"
import { useRouter } from "next/router"
import { http } from "../lib/axios"
import Button from "../components/Button"
import Navbar from "../components/Navbar"

const GOOGLE_URL =
    "https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fdrive%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile&response_type=code&client_id=284698818268-hvd9hbn4fggag8eoniccgl9t7kcgi8md.apps.googleusercontent.com&redirect_uri=http%3A%2F%2Flocalhost%3A3000/login"

const Login: NextPage = () => {
    const router = useRouter()
    const { code } = router.query

    useEffect(() => {
        const authorizeGoogle = async () => {
            const res = await http.post("/auth/google", { code })
            if (res.status === 200) {
                router.push("/")
            }
        }
        if (code) {
            authorizeGoogle()
        }
    }, [code])

    return (
        <>
            <Navbar loggedIn={false} />
            <div className={styles.container}>
                <h2 className={styles.head}>Welcome! Let's get rolling</h2>
                <h4 className={styles.subhead}>
                    Login with Google for storing media and files
                </h4>
                <Button>
                    <a href={GOOGLE_URL}>Login to Drive</a>
                </Button>
            </div>
        </>
    )
}

export const getServerSideProps = (ctx: GetServerSidePropsContext) => {
    const loggedIn = ctx.req.cookies.sid !== undefined
    if (loggedIn) {
        return {
            redirect: {
                destination: "/",
            },
        }
    } else {
        return {
            props: {},
        }
    }
}

export default Login
