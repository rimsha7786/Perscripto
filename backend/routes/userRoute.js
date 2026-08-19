import express from 'express';
import { registerUser,loginUser } from '../controllers/userController.js';

const userRouter = express.Router();


//register
userRouter.post('/register', registerUser);
//login
userRouter.post('/login', loginUser);

export default userRouter;

