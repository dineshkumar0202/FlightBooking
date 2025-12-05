import React, { useEffect, useState } from 'react'
import * as flightService from '../../services/flightService.js'
import FlightCard from '../../components/FlightCard.jsx'

const FlightList = () => {
  const [flights, setFlights] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState({ from: '', to: '', date: '' })

  const loadAll = async () => {
    try {
      const data = await flightService.getFlights()
      setFlights(data)
      setError('')
    } catch (err) {
      console.error('Error loading flights', err)
      setError('Could not load flights')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadAll()
  }, [])

  const handleSearchChange = (e) => {
    setSearch((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSearch = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      if (!search.from && !search.to && !search.date) {
        await loadAll()
        return
      }
      const data = await flightService.searchFlights(search)
      setFlights(data)
      setError(data.length === 0 ? 'No matching flights found' : '')
    } catch (err) {
      console.error('Search error', err)
      setError('Could not search flights')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="container-page py-10">
        <p className="text-sm text-slate-500">Loading flights...</p>
      </div>
    )
  }

  return (
    <div className="container-page py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-900">All Flights</h1>
      </div>

      {/* search bar */}
      <form
        onSubmit={handleSearch}
        className="glass-card p-4 grid md:grid-cols-4 gap-3 items-end mb-8"
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
            placeholder="Any"
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
            placeholder="Any"
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
          Search
        </button>
      </form>

      {error && <p className="text-sm text-red-500 mb-4">{error}</p>}

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
