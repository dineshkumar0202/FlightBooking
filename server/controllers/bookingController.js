import Booking from "../models/Booking.js";
import Flight from "../models/Flight.js";

// Create a new booking
export const createBooking = async (req, res) => {
  try {
    const userId = req.user?._id || req.user?.id;
    const { flightId, seats } = req.body;

    if (!userId) {
      return res.status(401).json({ msg: "Not authenticated" });
    }

    if (!flightId || !seats) {
      return res.status(400).json({ msg: "flightId and seats are required" });
    }

    const flight = await Flight.findById(flightId);
    if (!flight) {
      return res.status(404).json({ msg: "Flight not found" });
    }

    if (flight.seats < seats) {
      return res.status(400).json({ msg: "Not enough seats available" });
    }

    const totalPrice = seats * flight.price;

    const booking = await Booking.create({
      userId,
      flightId,
      passengers: seats,
      totalPrice,
      status: "confirmed",
    });

    // reduce available seats
    flight.seats -= seats;
    await flight.save();

    return res.status(201).json({
      msg: "Booking success",
      booking,
    });
  } catch (err) {
    console.error("🔥 BOOKING ERROR:", err);
    res.status(500).json({ msg: "Booking failed", error: err.message });
  }
};

// Get bookings for logged-in user
export const getMyBookings = async (req, res) => {
  try {
    const userId = req.user?._id || req.user?.id;
    const bookings = await Booking.find({ userId }).populate("flightId");
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Get single booking by id
export const getBookingById = async (req, res) => {
  try {
    const userId = req.user?._id || req.user?.id;
    const { id } = req.params;

    const booking = await Booking.findById(id)
      .populate("flightId")
      .populate("userId");

    if (!booking) {
      return res.status(404).json({ msg: "Booking not found" });
    }

    // allow owner or admin (admin checked by middleware if needed)
    if (booking.userId && booking.userId._id.toString() !== String(userId)) {
      return res.status(403).json({ msg: "Not allowed to view this booking" });
    }

    res.json(booking);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
