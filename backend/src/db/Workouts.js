import { workoutModel } from "../models/Workout.js";

const getAllWorkouts = async () => {
    const workouts = await workoutModel.find({}).sort({ createdAt: -1 })
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
    getAllWorkouts,
    getWorkout,
    addWorkout,
    deleteWorkout,
    updateWorkout
}