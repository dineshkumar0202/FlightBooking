import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log("Connecting to MongoDB:", process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected...🌱");
  } catch (err) {
    console.error("DB Error:", err.message);
    process.exit(1);
  }
};


export default connectDB;
