import React from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const Charts = () => {
  return (
   <div className="glass-card p-6 rounded-2xl">
  <h2 className="text-xl font-semibold mb-4 text-slate-900">Daily Booking Chart</h2>

  {stats.dailyStats?.length ? (
    <LineChart width={600} height={300} data={stats.dailyStats}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey="count" stroke="#2563eb" strokeWidth={3} />
    </LineChart>
  ) : (
    <p className="text-sm text-slate-500">No chart data available.</p>
  )}
</div>
  )
}

export default Charts
