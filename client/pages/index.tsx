import type { NextPage } from "next"
import DragDrop from "../components/DragDrop"
import Login from "../components/Login"
import styles from "../styles/index.module.scss"

const Home: NextPage = () => {
    return (
        <div className={styles.container}>
            <Login />
            <DragDrop />
        </div>
    )
}

export default Home
