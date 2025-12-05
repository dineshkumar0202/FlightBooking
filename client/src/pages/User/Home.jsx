import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FlightCard from '../../components/FlightCard.jsx'
import * as flightService from '../../services/flightService.js'

const Home = () => {
  const [flights, setFlights] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState({
    from: 'Chennai',
    to: 'Delhi',
    date: '',
  })

  const navigate = useNavigate()

  useEffect(() => {
    const load = async () => {
      try {
        const data = await flightService.getFlights()
        setFlights(data)
      } catch (err) {
        setError('Could not load flights')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const handleSearchChange = (e) => {
    setSearch((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSearch = async (e) => {
    e.preventDefault()
    try {
      const data = await flightService.searchFlights(search)
      setFlights(data)
    } catch (err) {
      setError('No flights found')
    }
  }

  return (
    <div className="pb-16">
      <section className="container-page py-10 grid md:grid-cols-[1.3fr,1fr] gap-10 items-center">
        <div>
          <p className="text-xs font-semibold tracking-[0.2em] text-slate-500 mb-2">
            READY TAKE-OFF
          </p>
          <h1 className="text-4xl md:text-5xl font-black leading-tight text-slate-900 mb-4">
            Convenient online
            <br />
            flight booking services
          </h1>
          <p className="text-sm text-slate-500 max-w-md mb-6">
            Discover top flight deals from Indian airports with a seamless booking
            experience. Search, book and download your ticket in minutes.
          </p>
          <form
            onSubmit={handleSearch}
            className="glass-card p-4 grid md:grid-cols-4 gap-3 items-end"
          >
            <div>
              <p className="text-[10px] font-semibold tracking-wide text-slate-500 mb-1">
                FROM
              </p>
              <input
                name="from"
                value={search.from}
                onChange={handleSearchChange}
                className="w-full rounded-2xl border border-slate-200 px-3 py-2 text-xs"
                placeholder="Chennai"
              />
            </div>
            <div>
              <p className="text-[10px] font-semibold tracking-wide text-slate-500 mb-1">
                TO
              </p>
              <input
                name="to"
                value={search.to}
                onChange={handleSearchChange}
                className="w-full rounded-2xl border border-slate-200 px-3 py-2 text-xs"
                placeholder="Delhi"
              />
            </div>
            <div>
              <p className="text-[10px] font-semibold tracking-wide text-slate-500 mb-1">
                DEPARTURE
              </p>
              <input
                type="date"
                name="date"
                value={search.date}
                onChange={handleSearchChange}
                className="w-full rounded-2xl border border-slate-200 px-3 py-2 text-xs"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-2xl bg-slate-900 text-white text-xs font-semibold py-2.5 hover:bg-slate-800 transition"
            >
              Search Flights
            </button>
          </form>
        </div>

        <div className="relative">
          <div className="aspect-[4/3] rounded-[2.5rem] bg-gradient-to-br from-sky-200 via-sky-50 to-slate-100 shadow-xl flex items-center justify-center overflow-hidden">
            <img
              src="https://images.pexels.com/photos/358319/pexels-photo-358319.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Airplane"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-4 left-6 glass-card px-4 py-2 text-xs">
            <p className="font-semibold text-slate-900">Top deals from India</p>
            <p className="text-slate-500">Exclusive offers from major airlines.</p>
          </div>
        </div>
      </section>

      <section className="container-page mt-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-slate-900">Available flights</h2>
          <button
            onClick={() => navigate('/flights')}
            className="text-xs text-slate-600 hover:text-slate-900"
          >
            View all →
          </button>
        </div>
        {error && <p className="text-sm text-red-600 mb-2">{error}</p>}
        {loading ? (
          <p className="text-sm text-slate-500">Loading flights...</p>
        ) : flights.length === 0 ? (
          <p className="text-sm text-slate-500">No flights available.</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-4">
            {flights.map((f) => (
              <FlightCard key={f._id || f.flightNumber} flight={f} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default Home
