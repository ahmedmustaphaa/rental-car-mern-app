// routes/bookingRoutes.js

import express from "express";
import { checkAvailabilityOfcar, createBooking, getOwnerBookings, getUserBookings, updateBookingStatus, updateUserImage } from "../controllers/bookingController.js";
import { protect } from "../middleware/auth.js"; 
const bookingRouter = express.Router();
bookingRouter.post("/create", protect, createBooking);
bookingRouter.get("/my-bookings", protect, getUserBookings);
bookingRouter.post("/check-availability", checkAvailabilityOfcar);
bookingRouter.get("/owner", protect, getOwnerBookings);
bookingRouter.put("/status", protect, updateBookingStatus);
bookingRouter.put("/upload-image", protect, updateUserImage);

export default bookingRouter;
