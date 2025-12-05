import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { createBooking } from "../controllers/bookingController.js";

const r = express.Router();

r.post("/", protect, createBooking);

export default r;
