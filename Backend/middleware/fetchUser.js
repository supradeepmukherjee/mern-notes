const jwt = require('jsonwebtoken')
const JWT_SECRET = ''


fetchUser = (req, res, next) => {
    // get the user from the jwt token and add id to the object
    const token = req.header('auth-token')
    if (!token) {
        return res.status(401).send({ error: 'Please authenticate using a valid token' })
    }
    try {
        const data = jwt.verify(token, JWT_SECRET)
        req.user = data.user
        next()
    } catch (err) {
        res.status(401).send({ error: 'Please authenticate using a valid token' })
    }
}
module.exports = fetchUser