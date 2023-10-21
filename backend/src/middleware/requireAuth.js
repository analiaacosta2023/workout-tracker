import jwt from 'jsonwebtoken'
import config from "../config.js";
import Users from "../db/Users.js";

export const requireAuth = async (req, res, next) => {

    const { authorization } = req.headers

    if (!authorization) {
        return res.status(401).json({ error: 'Authorization token required' })
    }

    const token = authorization.split(' ')[1]

    try {
         const {_id} = jwt.verify(token, config.secret)
         req.user = await Users.getUser(_id)
         next()
    } catch (error) {
        console.log(error)
        return res.status(401).json({ error: 'Request is not authorized' })
    }
}