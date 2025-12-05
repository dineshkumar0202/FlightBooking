import React, { useEffect, useState } from 'react'
import FlightCard from '../../components/FlightCard.jsx'
import * as flightService from '../../services/flightService.js'

const FlightList = () => {
  const [flights, setFlights] = useState([])

  useEffect(() => {
    const load = async () => {
      const data = await flightService.getFlights()
      setFlights(data)
    }
    load()
  }, [])

  return (
    <div className="container-page py-8">
      <h1 className="text-xl font-semibold mb-4 text-slate-900">All Flights</h1>
      {flights.length === 0 ? (
        <p className="text-sm text-slate-500">No flights yet.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-4">
          {flights.map((f) => (
            <FlightCard key={f._id || f.flightNumber} flight={f} />
          ))}
        </div>
      )}
    </div>
  )
}

export default FlightList
