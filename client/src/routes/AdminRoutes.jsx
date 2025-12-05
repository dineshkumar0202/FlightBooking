import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

const AdminRoutes = () => {
  const { user, loading } = useAuth()

  if (loading) return null

  return user?.role === 'admin' ? <Outlet /> : <Navigate to="/" />
}

export default AdminRoutes
