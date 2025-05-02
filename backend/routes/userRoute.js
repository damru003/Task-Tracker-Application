import express from 'express';
import { loginUser, registerUser, getUserData } from '../controllers/userController.js';
import authUser from '../middleware/auth.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/data', authUser ,getUserData);


export default userRouter;