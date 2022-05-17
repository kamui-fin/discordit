import type { GetServerSidePropsContext, NextPage } from "next"
import { useState } from "react"
import Button from "../components/Button"
import CopyUrl from "../components/CopyUrl"
import DragDrop from "../components/DragDrop"
import Navbar from "../components/Navbar"
import styles from "../styles/index.module.scss"
import { GiShare } from "react-icons/gi"
import { useMobileDevice } from "../lib/hooks"

const Home: NextPage = () => {
    const [shortenedUrl, setShortenedUrl] = useState("")
    const [isMobile] = useMobileDevice()

    const share = () => {
        if (navigator.share) {
            navigator
                .share({
                    url: shortenedUrl,
                })
                .then(() => {
                    console.log("Successfully shared")
                })
                .catch((error) => {
                    console.error(
                        "Something went wrong sharing the blog",
                        error
                    )
                })
        }
    }

    return (
        <>
            <Navbar loggedIn={true} />
            <div className={styles.container}>
                <DragDrop onDone={(url: string) => setShortenedUrl(url)} />
                <div className={styles.afterUpload}>
                    {shortenedUrl && (
                        <>
                            <CopyUrl link={shortenedUrl} />
                            {isMobile && (
                                <Button className={styles.share} onDone={share}>
                                    <GiShare />
                                </Button>
                            )}
                        </>
                    )}
                </div>
            </div>
        </>
    )
}

export const getServerSideProps = (ctx: GetServerSidePropsContext) => {
    const loggedIn = ctx.req.cookies.sid !== undefined
    if (!loggedIn) {
        return {
            redirect: {
                destination: "/login",
            },
        }
    } else {
        return {
            props: {},
        }
    }
}

export default Home
