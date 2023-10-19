import mongoose from "mongoose";

const Schema = mongoose.Schema

const workoutSchema = new Schema({
    category: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    reps: {
        type: Number,
        required: true
    },
    load: {
        type: Number,
        required: true
    },
    description: {
        type: String
    }
}, {timestamps: true})

export const workoutModel = mongoose.model('Workout', workoutSchema)
