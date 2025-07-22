import express from 'express';
import { getcars, getUserData, loginUser, registerUser } from '../controllers/userContoller.js';
import { protect } from '../middleware/auth.js';

const userRouter=express.Router();



userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.get('/user-data',protect,getUserData)
userRouter.get('/cars',getcars)

export default userRouter;