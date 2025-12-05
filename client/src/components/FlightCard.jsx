import React from 'react'
import { Link } from 'react-router-dom'

const FlightCard = ({ flight }) => {
  return (
    <div className="glass-card p-4 flex flex-col gap-3">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-400">
            {flight.airline}
          </p>
          <p className="font-semibold text-slate-900">
            {flight.from} → {flight.to}
          </p>
          <p className="text-xs text-slate-500">
            {flight.date} • {flight.time}
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs text-slate-400">From</p>
          <p className="text-lg font-semibold text-slate-900">₹{flight.price}</p>
        </div>
      </div>
      <div className="flex justify-between items-center text-xs text-slate-500">
        <p>Flight No: {flight.flightNumber}</p>
        <p>Seats left: {flight.seats}</p>
      </div>
      <div className="flex justify-end">
        <Link
          to={`/booking/${flight._id}`}
          className="px-4 py-1.5 rounded-full bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition"
        >
          Book Now
        </Link>
      </div>
    </div>
  )
}

export default FlightCard
