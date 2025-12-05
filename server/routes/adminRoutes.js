import express from "express";
import { getAllUsers, allBookings } from "../controllers/adminController.js";
import { protect } from "../middleware/authMiddleware.js";
import { adminCheck } from "../middleware/adminCheck.js";

const r = express.Router();
r.get("/users", protect, adminCheck, getAllUsers);
r.get("/bookings", protect, adminCheck, allBookings);

export default r;
