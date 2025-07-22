import  express from 'express';
import { protect } from '../middleware/auth.js';
import { addCar, changeRoleToOwner, DashboardData, getOwnerCar, softDeleteCar, toggleCar } from '../controllers/Rolercontroller.js';
import upload from '../middleware/mutler.js';
import { deleteModel } from 'mongoose';


const ownerRouter=express.Router();



ownerRouter.post('/change-role',protect,changeRoleToOwner)

ownerRouter.post('/add-cars', protect, upload.single('image'), addCar);
ownerRouter.get("/my-cars", protect, getOwnerCar);

ownerRouter.put('/cars/toggle', protect, toggleCar);

ownerRouter.get('/dashboard', protect, DashboardData);
ownerRouter.delete('/delete-car', protect, softDeleteCar);
export default ownerRouter;