import express from "express"
import helmet from "helmet"
import cors from "cors"
import morgan from "morgan"
import { APP_PORT } from "./config"
import { errorHandler } from "./middlewares/error"
import { errors } from "celebrate"
import { router } from "./routes"
import fileUpload from "express-fileupload"
import { connectDb, startSession } from "./db"

const app = express()
app.use(
    fileUpload({
        createParentPath: false,
    })
)
app.use(cors({ origin: "http://localhost:3000", credentials: true }))
app.use(helmet())
app.use(morgan("combined"))

const initRedis = async () => {
    app.use(await startSession())
}

const startExpress = () => {
    app.listen(APP_PORT, () => {
        console.log(`Listening to port ${APP_PORT}`)
    })
}

initRedis().then(async () => {
    // setup db, app, and routes
    app.use(express.json())
    app.use(router)
    app.use(errors())
    app.use(errorHandler)

    await connectDb()
    startExpress()
})
