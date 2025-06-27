import { Link, useRouter } from '@tanstack/react-router'
import { useAuth } from '../hooks/useAuth'
import { toast } from 'react-toastify'
import React from 'react'


export default function Navbar() {
  const { isLoggedIn, logout } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    toast.info('You have logged out')
    router.navigate({ to: '/' })
  }

  return (
    <nav className="bg-gray-100 px-6 py-4 flex justify-between items-center shadow-sm">
      <div className="text-xl font-bold text-blue-700">
        <Link to="/">Appflame Recipes</Link>
      </div>
      <div className="flex gap-4 text-blue-600 font-medium items-center">
        {!isLoggedIn ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <>
            <Link to="/add-recipe">Add recipe</Link>
            <button
              onClick={handleLogout}
              className="text-red-600 hover:underline"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  )
}