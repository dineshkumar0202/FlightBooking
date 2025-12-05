import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { createBooking, getMyBookings, getBookingById } from "../controllers/bookingController.js";

const r = express.Router();

// create booking
r.post("/", protect, createBooking);

// current user's bookings
r.get("/me", protect, getMyBookings);

// single booking by id
r.get("/:id", protect, getBookingById);

export default r;
