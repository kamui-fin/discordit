import { GetServerSidePropsContext, NextPage } from "next"
import Navbar from "../components/Navbar"
import styles from "../styles/settings.module.scss"
import { useForm } from "react-hook-form";
import { http } from "../lib/axios";

export interface ISettings {
    maximumSpace: number; // in mb
    enableCompression: boolean;
    daysExpiry: number;
    hoursExpiry: number;
    minutesExpiry: number;
}

const Settings: NextPage = ({ loggedIn }) => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>();
    const onSubmit = async (data) => {
        await http.post("/auth/settings/save", { settings: data })
    }

    return (
        <div>
            <Navbar loggedIn={loggedIn} />
            <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <h3>Uploads</h3>
                    <hr className={styles.divider} />
                    <div>
                        <div>
                            <h4>Maximum drive space</h4>
                            <input type="number" defaultValue={0} {...register("maximumSpace", {valueAsNumber: true})} placeholder="Megabytes"/>
                        </div>
                        <div>
                            <h4>Enable compression for supported formats</h4>
                            <input type="checkbox" defaultValue={false} {...register("enableCompression")}/>
                        </div>
                    </div>
                </div>
                <div>
                    <h3>URLs</h3>
                    <hr className={styles.divider} />
                    <div>
                        <div>
                            <h4>Duration before expiry</h4>
                            <input type="number" placeholder="Days" defaultValue={0} {...register("daysExpiry", {valueAsNumber: true})} />
                            <input type="number" placeholder="Hours" defaultValue={0} {...register("hoursExpiry", {valueAsNumber: true})} />
                            <input type="number" placeholder="Minutes" defaultValue={0} {...register("minutesExpiry", {valueAsNumber: true})} />
                        </div>
                    </div>
                </div>
                <input type="submit" />
            </form>
        </div>
    )
}

// only for navbar prop, clean up later
export const getServerSideProps = (ctx: GetServerSidePropsContext) => {
    const loggedIn = ctx.req.cookies.sid !== undefined
    return {
        props: {
            loggedIn,
        },
    }
}

export default Settings
