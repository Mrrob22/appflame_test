import { Link } from '@tanstack/react-router'
import React from 'react'

export default function Navbar() {
    return (
        <nav className="p-4 bg-gray-100 flex gap-4 text-blue-600 font-semibold">
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            <Link to="/add-recipe">Add Recipe</Link>
        </nav>
    )
}
