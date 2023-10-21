import { workoutModel } from "../models/Workout.js";

const getWorkouts = async (user_id) => {
    const workouts = await workoutModel.find({user_id}).sort({ createdAt: -1 })
    return workouts.map(workout => workout.toObject());
}

const getWorkout = async (id) => {
    const workout = await workoutModel.findById(id).lean();
    return workout;
}

const addWorkout = async (newWorkout) => {
    const workout = await workoutModel.create(newWorkout);
    return workout;
}

const deleteWorkout = async (id) => {
    const workout = await workoutModel.findOneAndDelete({_id: id});
    return workout;
}

const updateWorkout = async (id, updates) => {
    const workout = await workoutModel.findOneAndUpdate({_id: id}, updates);
    return workout;
}


export default {
    getWorkouts,
    getWorkout,
    addWorkout,
    deleteWorkout,
    updateWorkout
}