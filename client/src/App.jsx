import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'

import Login from './pages/Auth/Login.jsx'
import Register from './pages/Auth/Register.jsx'

import Home from './pages/User/Home.jsx'
import FlightList from './pages/User/FlightList.jsx'
import BookingPage from './pages/User/BookingPage.jsx'
import PaymentPage from './pages/User/PaymentPage.jsx'
import TicketView from './pages/User/TicketView.jsx'

import Dashboard from './pages/Admin/Dashboard.jsx'
import UserList from './pages/Admin/UserList.jsx'
import TicketList from './pages/Admin/TicketList.jsx'
import Charts from './pages/Admin/Charts.jsx'

import UserRoutes from './routes/UserRoutes.jsx'
import AdminRoutes from './routes/AdminRoutes.jsx'

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-sky-50 to-slate-100">
      <Navbar />
      <main className="flex-1">
        <Routes>
          {/* public */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />

          {/* user protected routes */}
          <Route element={<UserRoutes />}>
            <Route path="/flights" element={<FlightList />} />
            <Route path="/booking/:flightId" element={<BookingPage />} />
            <Route path="/payment/:bookingId" element={<PaymentPage />} />
            <Route path="/ticket/:bookingId" element={<TicketView />} />
          </Route>

          {/* admin protected routes */}
          <Route element={<AdminRoutes />}>
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/admin/users" element={<UserList />} />
            <Route path="/admin/tickets" element={<TicketList />} />
            <Route path="/admin/charts" element={<Charts />} />
          </Route>

          {/* fallback */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
