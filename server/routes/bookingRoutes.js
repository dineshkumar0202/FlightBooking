import express from "express";
import { createBooking } from "../controllers/bookingController.js";
import { protect } from "../middleware/authMiddleware.js";

const r = express.Router();
r.post("/create", protect, createBooking);

export default r;
