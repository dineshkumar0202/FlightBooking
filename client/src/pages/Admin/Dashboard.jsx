import React, { useEffect, useState } from "react";
import { getAdminStats } from "../../services/adminService";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
          try {
            const data = await getAdminStats();
            setStats(data);
          } catch (err) {
            console.error("Admin stats error:", err);
          } finally {
            setLoading(false);
          }
    };

    loadStats();
  }, []);

  if (loading) return <p className="p-6">Loading admin dashboard...</p>;
  if (!stats) return <p className="p-6 text-red-500">Unable to load admin stats.</p>;

  return (
    <div className="container-page py-10">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">
        <div className="glass-card p-6">
          <p className="text-gray-500">Total Bookings</p>
          <h2 className="text-3xl font-bold">{stats.totalBookings}</h2>
        </div>

        <div className="glass-card p-6">
          <p className="text-gray-500">Total Revenue</p>
          <h2 className="text-3xl font-bold">₹{stats.totalRevenue}</h2>
        </div>

        <div className="glass-card p-6">
          <p className="text-gray-500">Total Flights</p>
          <h2 className="text-3xl font-bold">{stats.flightCount}</h2>
        </div>
      </div>

      {/* Daily Stats */}
      <div className="glass-card p-6 rounded-xl">
        <h2 className="text-xl font-semibold mb-4">Daily Booking Summary</h2>

        {stats.dailyStats?.length ? (
          stats.dailyStats.map((d) => (
            <div key={d.date} className="py-2 border-b text-sm">
              <strong>{d.date}</strong> — {d.count} bookings — ₹{d.revenue}
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm">No daily stats available.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
