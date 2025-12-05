import Booking from "../models/Booking.js";

export const createBooking = async (req, res) => {
  try {
    const { flightId, passengers, totalPrice } = req.body;

    if (!flightId || !passengers || !totalPrice) {
      return res.status(400).json({ msg: "flightId, passengers and totalPrice are required" });
    }

    const booking = await Booking.create({
      userId: req.user?._id || null,
      flightId,
      passengers,
      totalPrice,
      status: "confirmed",
    });

    res.json({ msg: "Booking done", booking });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
