import User from "../models/User.js";
import Booking from "../models/Booking.js";
import Flight from "../models/Flight.js";


export const getAllUsers = async (req,res)=>{
  res.json(await User.find());
};

export const allBookings = async (req,res)=>{
  res.json(await Booking.find().populate("userId").populate("flightId"));
};


export const getStats = async (req, res) => {
  try {
    const totalBookings = await Booking.countDocuments();

    const revenueResult = await Booking.aggregate([
      { $group: { _id: null, revenue: { $sum: "$totalPrice" } } }
    ]);

    const totalRevenue = revenueResult[0]?.revenue || 0;
    const flightCount = await Flight.countDocuments();

    // daily booking stats
    const dailyStats = await Booking.aggregate([
      {
        $group: {
          _id: "$date",
          count: { $sum: 1 },
          revenue: { $sum: "$totalPrice" }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.json({
      totalBookings,
      totalRevenue,
      flightCount,
      dailyStats: dailyStats.map(d => ({
        date: d._id,
        count: d.count,
        revenue: d.revenue
      }))
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
