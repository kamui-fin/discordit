import type { NextPage } from "next"
import Login from "../components/Login"
import styles from "../styles/index.module.scss"

const Home: NextPage = () => {
    return (
        <div className={styles.container}>
            <Login />
        </div>
    )
}

export default Home
