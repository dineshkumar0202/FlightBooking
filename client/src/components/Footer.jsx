import React from 'react'

const Footer = () => {
  return (
    <footer className="border-t border-slate-200 bg-white/70 backdrop-blur">
      <div className="container-page py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
        <p>© {new Date().getFullYear()} Flight Booking. All rights reserved.</p>
        <p>Happy journeys</p>
      </div>
    </footer>
  )
}

export default Footer
