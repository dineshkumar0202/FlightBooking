import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { getAdminStats } from "../../services/adminService";

const Charts = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getAdminStats();
        setStats(data);
      } catch (err) {
        console.error("Admin stats chart error:", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) {
    return (
      <div className="container-page py-8">
        <p className="text-sm text-slate-500">Loading chart...</p>
      </div>
    );
  }

  if (!stats || !stats.dailyStats?.length) {
    return (
      <div className="container-page py-8">
        <p className="text-sm text-slate-500">No chart data available.</p>
      </div>
    );
  }

  return (
    <div className="container-page py-8">
      <div className="glass-card p-6 rounded-2xl">
        <h2 className="text-xl font-semibold mb-4 text-slate-900">
          Daily Booking Chart
        </h2>
        <LineChart width={600} height={300} data={stats.dailyStats}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="count" stroke="#2563eb" strokeWidth={3} />
        </LineChart>
      </div>
    </div>
  );
};

export default Charts;
