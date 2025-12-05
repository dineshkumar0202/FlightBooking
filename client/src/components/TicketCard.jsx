import React from 'react'

const TicketCard = ({ ticket }) => {
  return (
    <div className="glass-card p-4 flex flex-col gap-2 text-sm">
      <div className="flex justify-between">
        <p className="font-semibold text-slate-900">{ticket.passengerName}</p>
        <p className="text-xs text-slate-500">#{ticket._id?.slice(-6)}</p>
      </div>
      <div className="flex justify-between text-xs text-slate-600">
        <div>
          <p className="font-medium">
            {ticket.flight.from} → {ticket.flight.to}
          </p>
          <p>
            {ticket.flight.date} • {ticket.flight.time}
          </p>
        </div>
        <div className="text-right">
          <p>Seats: {ticket.passengers}</p>
          <p className="font-semibold text-slate-900">₹{ticket.totalPrice}</p>
        </div>
      </div>
    </div>
  )
}

export default TicketCard
