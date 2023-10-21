import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import validator from 'validator';

const Schema = mongoose.Schema

const userSchema = new Schema({
    first_name: String,
    last_name: String,
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
    },
    password: {
        type: String,
        required: true
    },
    birthday: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        enum: ['MALE', 'FEMALE', 'CUSTOM']
    }
})

// static signup method
userSchema.statics.signup = async function (first_name, last_name, email, password, birthday, gender) {

    // validation
    if(!first_name || !last_name || !email || !password || !birthday || !gender) {
        throw Error('All fields must be filled')
    }
    if(!validator.isEmail(email)){
        throw Error('Email is not valid')
    }
    if(!validator.isStrongPassword(password)) {
        throw Error('Password not strong enough')
    }

    const exists = await this.findOne({email})

    if (exists) {
        throw Error ('Email already in use')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({first_name, last_name, email, password: hash, birthday, gender})
    return user
}

//static login method

userSchema.statics.login = async function(email, password) {

    if(!email || !password) {
        throw Error('All fields must be filled')
    }

    const user = await this.findOne({email})

    if(!user) {
        throw Error('Incorrect email')
    }

    const match = await bcrypt.compare(password, user.password)

    if(!match) {
        throw Error('Incorrect password')
    }

    return user

}

export const userModel = mongoose.model('User', userSchema)