import Users from "../db/Users.js";
import jwt from 'jsonwebtoken'
import config from "../config.js";

const createToken = (_id) => {
    return jwt.sign({ _id }, config.secret, { expiresIn: '3d' })
}

export const loginUser = async (req, res) => {

    const { email, password } = req.body

    try {
        const user = await Users.login(email, password)

        const token = createToken(user._id)

        res.status(200).json({email, token})
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

export const signupUser = async (req, res) => {

    const { email, password } = req.body

    try {
        const user = await Users.signup(email, password)

        const token = createToken(user._id)

        res.status(200).json({email, token})
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}