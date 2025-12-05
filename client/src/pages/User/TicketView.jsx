import React from 'react'
import { useParams } from 'react-router-dom'

const TicketView = () => {
  const { bookingId } = useParams()

  return (
    <div className="container-page py-10 flex justify-center">
      <div className="glass-card max-w-lg w-full p-8">
        <h1 className="text-xl font-semibold mb-4 text-slate-900">Your Ticket</h1>
        <p className="text-sm text-slate-500 mb-4">
          This is a placeholder ticket view. Connect it to your backend booking details and
          PDF generator.
        </p>
        <div className="border border-dashed border-slate-300 rounded-2xl p-4 text-sm">
          <p className="font-semibold text-slate-900 mb-2">Booking ID</p>
          <p className="text-xs text-slate-500 break-all">{bookingId}</p>
        </div>
        <button className="mt-6 w-full rounded-xl border border-slate-300 text-sm py-2.5 hover:bg-slate-900 hover:text-white transition">
          Download Ticket PDF
        </button>
      </div>
    </div>
  )
}

export default TicketView
