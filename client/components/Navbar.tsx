import LogoutButton from "./LogoutButton"
import styles from "../styles/Navbar.module.scss"
import Link from "next/link"

const Navbar = ({ loggedIn }) => (
    <nav className={styles.navbar}>
        <div className={styles.items}>
            <Link href="/">
                <a className={styles.link}>
                    <h2 className={styles.logo}>discord.it</h2>
                </a>
            </Link>
            {!loggedIn && (
                <ul className={styles.menu}>
                    <li>
                        <Link href="/settings">
                            <a className={styles.link}>Settings</a>
                        </Link>
                    </li>
                    <LogoutButton />
                </ul>
            )}
        </div>
    </nav>
)

export default Navbar
