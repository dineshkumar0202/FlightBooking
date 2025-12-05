import express from "express";
import { getAllUsers, allBookings } from "../controllers/adminController.js";
import { protect } from "../middleware/authMiddleware.js";
import { adminCheck } from "../middleware/adminCheck.js";
import { getStats } from "../controllers/adminController.js";

const r = express.Router();
r.get("/stats", protect, adminCheck, getStats);
r.get("/users", protect, adminCheck, getAllUsers);
r.get("/bookings", protect, adminCheck, allBookings);

export default r;
