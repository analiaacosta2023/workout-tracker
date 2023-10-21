import { Router } from 'express';
import { getWorkouts, getWorkout, newWorkout, deleteWorkout, updateWorkout } from '../controllers/workouts.js';
import { requireAuth } from '../middleware/requireAuth.js';

const router = Router();

router.use(requireAuth)

router.get('/', getWorkouts);

router.get('/:wid', getWorkout);

router.post('/', newWorkout);

router.delete('/:wid', deleteWorkout);

router.patch('/:wid', updateWorkout);


export default router;
