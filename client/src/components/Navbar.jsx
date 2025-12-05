import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

const Navbar = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const navLinkClass = ({ isActive }) =>
    `px-3 py-1 rounded-full text-sm font-medium ${
      isActive ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
    }`

  return (
    <header className="sticky top-0 z-20 bg-sky-50/80 backdrop-blur border-b border-slate-200/50">
      <div className="container-page flex items-center justify-between py-4">
        <Link to="/" className="flex items-center gap-2">
          <span className="inline-flex h-8 w-8 rounded-2xl bg-slate-900 text-white items-center justify-center text-xs font-bold">
            FB
          </span>
          <span className="font-semibold tracking-tight text-slate-900">
            Flight Booking
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-2">
          <NavLink to="/" className={navLinkClass}>
            Flights
          </NavLink>
          {user && (
            <NavLink to="/flights" className={navLinkClass}>
              My Trips
            </NavLink>
          )}
          {user?.role === 'admin' && (
            <NavLink to="/admin" className={navLinkClass}>
              Admin
            </NavLink>
          )}
        </nav>
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <span className="hidden sm:inline text-sm text-slate-600">
                Hi, <span className="font-medium">{user.name}</span>
              </span>
              <button
                onClick={handleLogout}
                className="px-4 py-1.5 rounded-full border border-slate-300 text-sm font-medium hover:bg-slate-900 hover:text-white transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-1.5 rounded-full border border-slate-300 text-sm font-medium hover:bg-slate-900 hover:text-white transition"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="hidden sm:inline px-4 py-1.5 rounded-full bg-slate-900 text-white text-sm font-semibold shadow hover:bg-slate-800 transition"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

export default Navbar
