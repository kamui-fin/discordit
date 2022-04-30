export const onlyAuth = (req, res, next) => {
    if (req.session && req.session.loggedIn) {
        next()
    } else {
        res.status(401)
    }
}
