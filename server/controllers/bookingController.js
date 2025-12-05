import Booking from "../models/Booking.js";
import Flight from "../models/Flight.js";

export const createBooking = async (req, res) => {
  try {
    const userId = req.user.id;  // comes from JWT middleware
    const { flightId, seats } = req.body;

    if (!flightId || !seats) {
      return res.status(400).json({ msg: "Missing flightId or seats" });
    }

    const flight = await Flight.findById(flightId);
    if (!flight) {
      return res.status(404).json({ msg: "Flight not found" });
    }

    if (flight.seats < seats) {
      return res.status(400).json({ msg: "Not enough seats available" });
    }

    const totalPrice = seats * flight.price;

    // create booking
    const booking = await Booking.create({
      user: userId,
      flight: flightId,
      seats,
      totalPrice,
      date: new Date().toISOString().slice(0, 10)
    });

    // update remaining seats
    flight.seats -= seats;
    await flight.save();

    return res.status(201).json({
      msg: "Booking success",
      booking
    });

  } catch (err) {
    console.error("🔥 BOOKING ERROR:", err);
    res.status(500).json({ msg: "Booking failed", error: err.message });
  }
};
