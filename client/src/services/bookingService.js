import { api } from './api'

// Create booking (used on BookingPage)
export const createBooking = async ({ flightId, seats }) => {
  const res = await api.post('/bookings', { flightId, seats })
  return res.data
}

// Current user's bookings
export const getMyBookings = async () => {
  const res = await api.get('/bookings/me')
  return res.data
}

// Single booking by id (for ticket view)
export const getBookingById = async (id) => {
  const res = await api.get(`/bookings/${id}`)
  return res.data
}
