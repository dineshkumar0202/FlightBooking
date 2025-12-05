import { api } from './api'

export const getFlights = async () => {
  const res = await api.get('/flights')   // ✅ this hits /api/flights
  return res.data
}

export const searchFlights = async (params) => {
  const res = await api.get('/flights/search', { params })
  return res.data
}
