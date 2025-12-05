import express from "express";
import { addFlight, getFlights, searchFlights } from "../controllers/flightController.js";
import { protect } from "../middleware/authMiddleware.js";
import { adminCheck } from "../middleware/adminCheck.js";

const r = express.Router();

// Admin can add new flights
r.post("/add", protect, adminCheck, addFlight);

// Public endpoints for listing/searching flights
r.get("/", getFlights);
r.get("/search", searchFlights);

export default r;
