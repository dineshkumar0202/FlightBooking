import { api } from './api'

export const createBooking = async (payload) => {
  const res = await api.post('/bookings/create', payload)
  return res.data
}

export const getMyBookings = async () => {
  const res = await api.get('/bookings/me')
  return res.data
}


export const bookFlight = async (flightId, seats) => {
  const res = await api.post("/bookings", {
    flightId,
    seats
  });
  return res.data;
};
