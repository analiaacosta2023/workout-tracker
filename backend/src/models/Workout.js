import mongoose from "mongoose";

const Schema = mongoose.Schema

const workoutSchema = new Schema({
    bodyPart: {
        type: String,
        required: true
    },
    equipment: String,
    name: {
        type: String,
        required: true
    },
    gifUrl: String,
    instructions: [],
    secondaryMuscles: [],
    target: String,
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
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    }
}, {timestamps: true})

export const workoutModel = mongoose.model('Workout', workoutSchema)
