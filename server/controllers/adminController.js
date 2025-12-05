import User from "../models/User.js";
import Booking from "../models/Booking.js";

export const getAllUsers = async (req,res)=>{
  res.json(await User.find());
};

export const allBookings = async (req,res)=>{
  res.json(await Booking.find().populate("userId").populate("flightId"));
};
