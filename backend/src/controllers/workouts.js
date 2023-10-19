import Workouts from "../db/Workouts.js";
import mongoose from "mongoose";

export const getAllWorkouts = async (req, res) => {
    try {
        const workouts = await Workouts.getAllWorkouts({})

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
    const { category, title, reps, load, description } = req.body

    let emptyFields = []

    if(!category) {
        emptyFields.push('category')
    }
    if(!title) {
        emptyFields.push('title')
    }
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
        const workout = await Workouts.addWorkout({ category, title, reps, load, description })
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