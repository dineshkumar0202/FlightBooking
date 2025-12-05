import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { getBookingById } from "../../services/bookingService.js";
import { toast } from "react-hot-toast";

const TicketView = () => {
  const { bookingId } = useParams();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const ticketRef = useRef(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getBookingById(bookingId);
        setBooking(data);
      } catch (err) {
        console.error("Ticket load error", err);
        toast.error(err.response?.data?.msg || "Could not load ticket");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [bookingId]);

  const handleDownload = () => {
    // Simple approach: print the ticket area (user can save as PDF)
    window.print();
  };

  if (loading) {
    return (
      <div className="container-page py-10 flex justify-center">
        <p className="text-sm text-slate-500">Loading ticket...</p>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="container-page py-10 flex justify-center">
        <p className="text-sm text-red-500">Ticket not found.</p>
      </div>
    );
  }

  const flight = booking.flightId;

  return (
    <div className="container-page py-10 flex justify-center">
      <div className="glass-card max-w-lg w-full p-8" ref={ticketRef}>
        <h1 className="text-xl font-semibold mb-4 text-slate-900">Your Ticket</h1>
        <div className="border border-dashed border-slate-300 rounded-2xl p-4 text-sm mb-4">
          <p className="font-semibold text-slate-900 mb-1">
            {flight.from} → {flight.to}
          </p>
          <p className="text-xs text-slate-600 mb-1">
            {flight.date} • {flight.time}
          </p>
          <p className="text-xs text-slate-600 mb-1">Airline: {flight.airline}</p>
          <p className="text-xs text-slate-600 mb-1">
            Flight No: {flight.flightNumber}
          </p>
          <p className="text-xs text-slate-600 mb-1">
            Passenger(s): {booking.passengers}
          </p>
          <p className="text-xs text-slate-600 mb-1">
            Total Paid: ₹{booking.totalPrice}
          </p>
          <p className="text-xs text-slate-400 mt-2">Booking ID: {booking._id}</p>
        </div>
        <button
          onClick={handleDownload}
          className="mt-2 w-full rounded-xl border border-slate-300 text-sm py-2.5 hover:bg-slate-900 hover:text-white transition"
        >
          Download Ticket (Print as PDF)
        </button>
      </div>
    </div>
  );
};

export default TicketView;
