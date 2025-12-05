import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  bookingId: { type: mongoose.Schema.Types.ObjectId, ref: "Booking" },
  amount: Number,
  status: String,
  provider: String
});

export default mongoose.model("Payment", paymentSchema);
