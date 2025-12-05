import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as flightService from "../../services/flightService.js";
import * as bookingService from "../../services/bookingService.js";

const BookingPage = () => {
  const { flightId } = useParams();
  const [flight, setFlight] = useState(null);
  const [passengers, setPassengers] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      const all = await flightService.getFlights();
      const f = all.find((x) => x._id === flightId);
      setFlight(f || null);
    };
    load();
  }, [flightId]);

  const handleBooking = async () => {
    if (!flight) return;
    setLoading(true);
    try {
      const res = await bookingService.createBooking({
        flightId: flight._id,
        seats: passengers, // 🔥 FIXED
      });

      navigate(`/payment/${res.booking._id}`);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.msg || "Booking failed");
    } finally {
      setLoading(false);
    }
  };

  if (!flight) {
    return (
      <div className="container-page py-10">
        <p className="text-sm text-slate-500">Loading flight...</p>
      </div>
    );
  }

  return (
    <div className="container-page py-10 grid md:grid-cols-2 gap-8">
      <div className="glass-card p-6">
        <h1 className="text-lg font-semibold text-slate-900 mb-2">
          {flight.from} → {flight.to}
        </h1>
        <p className="text-sm text-slate-500 mb-4">
          {flight.date} • {flight.time}
        </p>
        <p className="text-sm text-slate-500 mb-2">Airline: {flight.airline}</p>
        <p className="text-sm text-slate-500 mb-2">Flight No: {flight.flightNumber}</p>
        <p className="text-sm text-slate-500 mb-2">Seats left: {flight.seats}</p>
        <p className="text-lg font-semibold text-slate-900 mt-2">₹{flight.price}</p>
      </div>

      <div className="glass-card p-6">
        <h2 className="text-md font-semibold mb-4 text-slate-900">
          Booking details
        </h2>

        <label className="text-sm font-medium text-slate-700">
          Number of passengers
        </label>
        <input
          type="number"
          min={1}
          max={9}
          value={passengers}
          onChange={(e) => setPassengers(Number(e.target.value))}
          className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm mb-4"
        />

        <button
          onClick={handleBooking}
          disabled={loading}
          className="w-full rounded-xl bg-slate-900 text-white text-sm font-semibold py-2.5 hover:bg-slate-800 transition disabled:opacity-60"
        >
          {loading ? "Processing..." : "Confirm Booking"}
        </button>
      </div>
    </div>
  );
};

export default BookingPage;
