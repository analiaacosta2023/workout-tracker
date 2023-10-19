import { userModel } from "../models/User.js";

const signup = async (email, password) => {
    const user = await userModel.signup(email, password)
    return user
}

const login = async (email, password) => {
    const user = await userModel.login(email, password)
    return user
}

export default {
    signup,
    login
}