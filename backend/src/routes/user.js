import { Router } from 'express';
import { loginUser, signupUser } from '../controllers/user.js';


const router = Router();

router.post('/login', loginUser)

router.post('/signup', signupUser)

export default router;