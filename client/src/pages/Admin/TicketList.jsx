import React from 'react'

const TicketList = () => {
  return (
    <div className="container-page py-8">
      <h1 className="text-xl font-semibold mb-4 text-slate-900">Tickets</h1>
      <p className="text-sm text-slate-500">
        Fetch ticket / booking list from <code>/api/admin/bookings</code>.
      </p>
    </div>
  )
}

export default TicketList
