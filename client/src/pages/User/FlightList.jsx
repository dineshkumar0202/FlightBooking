import React, { useEffect, useState } from 'react'
import * as flightService from '../../services/flightService.js'
import FlightCard from '../../components/FlightCard.jsx'

const FlightList = () => {
  const [flights, setFlights] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const load = async () => {
      try {
        const data = await flightService.getFlights()   // ✅ fetch all flights
        setFlights(data)
      } catch (err) {
        console.error('Error loading flights', err)
        setError('Could not load flights')
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  if (loading) {
    return <div className="container-page py-10">Loading flights...</div>
  }

  if (error) {
    return <div className="container-page py-10 text-red-500">{error}</div>
  }

  return (
    <div className="container-page py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-900">All Flights</h1>
      </div>

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
