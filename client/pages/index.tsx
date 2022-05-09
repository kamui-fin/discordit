import type { GetServerSidePropsContext, NextPage } from "next"
import DragDrop from "../components/DragDrop"
import Navbar from "../components/Navbar"
import styles from "../styles/index.module.scss"

const Home: NextPage = () => {
    return (
        <>
            <Navbar loggedIn={false} />
            <div className={styles.container}>
                <DragDrop />
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
