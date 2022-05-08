import { RequestHandler } from "express"

export const onlyAuth: RequestHandler = (req, res, next) => {
    if (req.session && req.session.loggedIn) {
        next()
    } else {
        res.status(401)
    }
}
