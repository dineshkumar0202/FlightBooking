import mongoose from "mongoose";

const flightSchema = new mongoose.Schema({
  airline: String,
  flightNumber: { type: String, unique: true },
  from: String,
  to: String,
  date: String,
  time: String,
  price: Number,
  seats: { type: Number, default: 60 }
});

export default mongoose.model("Flight", flightSchema);
