import type { GetServerSidePropsContext, NextPage } from "next"
import DragDrop from "../components/DragDrop"
import LogoutButton from "../components/LogoutButton"
import styles from "../styles/index.module.scss"

const Home: NextPage = () => {
    return (
        <div className={styles.container}>
            <DragDrop />
            <LogoutButton />
        </div>
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
