import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  flightId: { type: mongoose.Schema.Types.ObjectId, ref: "Flight" },
  passengers: Number,
  totalPrice: Number,
  status: { type: String, default: "confirmed" }
});

export default mongoose.model("Booking", bookingSchema);
