import { GetServerSidePropsContext } from "next"
import Navbar from "../components/Navbar"
import styles from "../styles/about.module.scss"

const About = ({ loggedIn }) => (
    <div>
        <Navbar loggedIn={loggedIn} />
        <div className={styles.aboutContainer}>
            <h1>About</h1>
            <p>
                Shareit is a web application designed to get around media or
                file size limits of various platforms, such as Discord's 8 MB
                limit. These size limits can be frustrating to deal with,
                severely limiting your user experience and ability to utilize
                basic features. This webapp makes use of Google Drive to store
                user-uploaded media and files, rather than storing it
                server-side.
            </p>
            <p>
                This is still in heavy development, and all contributions to the
                Github{" "}
                <a href="https://github.com/kamui-fin/discordit">repository</a>{" "}
                are welcomed. Many more features are to be expected, including
                client-side ffmpeg compression and converting, media management,
                expire time for URLs, and more.
            </p>
        </div>
    </div>
)

// only for navbar prop, clean up later
export const getServerSideProps = (ctx: GetServerSidePropsContext) => {
    const loggedIn = ctx.req.cookies.sid !== undefined
    return {
        props: {
            loggedIn,
        },
    }
}

export default About
