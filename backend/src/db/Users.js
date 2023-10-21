import { userModel } from "../models/User.js";

const signup = async (first_name, last_name, email, password, birthday, gender) => {
    const user = await userModel.signup(first_name, last_name, email, password, birthday, gender)
    return user
}

const login = async (email, password) => {
    const user = await userModel.login(email, password)
    return user
}

const getUser = async (_id) => {
 const user = await userModel.findOne({_id})
 return user
}

export default {
    signup,
    login,
    getUser
}