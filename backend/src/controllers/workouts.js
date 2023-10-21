import Workouts from "../db/Workouts.js";
import mongoose from "mongoose";

export const getWorkouts = async (req, res) => {
    try {

        const user_id = req.user._id
        const workouts = await Workouts.getWorkouts(user_id)

        res.status(200).json(workouts)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

export const getWorkout = async (req, res) => {
    try {
        const wid = req.params.wid

        if (!mongoose.Types.ObjectId.isValid(wid)) {
            return res.status(404).json({ error: 'Not valid id' })
        }

        const workout = await Workouts.getWorkout(wid)

        if (!workout) {
            return res.status(404).json({ error: 'No such workout' })
        }

        res.status(200).json(workout)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

export const newWorkout = async (req, res) => {
    const { bodyPart, equipment, name, gifUrl, instructions, secondaryMuscles, target, reps, load, description } = req.body

    let emptyFields = []

    if(!load) {
        emptyFields.push('load')
    }
    if(!reps) {
        emptyFields.push('reps')
    }
    if(emptyFields.length > 0 ) {
       return res.status(400).json({ error: 'Please fill in all the required fields', emptyFields })
    }

    try {
        const user_id = req.user._id
        const workout = await Workouts.addWorkout({ bodyPart, equipment, name, gifUrl, instructions, secondaryMuscles, target, reps, load, description, user_id })
        res.status(200).json(workout)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

export const deleteWorkout =  async (req, res) => {
    try {
        const wid = req.params.wid

        if (!mongoose.Types.ObjectId.isValid(wid)) {
            return res.status(404).json({ error: 'Not valid id' })
        }

        const workout = await Workouts.deleteWorkout(wid)

        if (!workout) {
            return res.status(404).json({ error: 'No such workout' })
        }

        res.status(200).json(workout)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

export const updateWorkout = async (req, res) => {
    try {
        const wid = req.params.wid

        const updates = req.body

        if (!mongoose.Types.ObjectId.isValid(wid)) {
            return res.status(404).json({ error: 'Not valid id' })
        }

        const workout = await Workouts.updateWorkout(wid, updates)

        if (!workout) {
            return res.status(404).json({ error: 'No such workout' })
        }

        res.status(200).json(workout)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}