import { Router } from 'express';
import { getAllWorkouts, getWorkout, newWorkout, deleteWorkout, updateWorkout } from '../controllers/workouts.js';

const router = Router();

router.get('/', getAllWorkouts);

router.get('/:wid', getWorkout);

router.post('/', newWorkout);

router.delete('/:wid', deleteWorkout);

router.patch('/:wid', updateWorkout);


export default router;
