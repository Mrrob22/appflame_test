import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { toast } from 'react-toastify'
import React from 'react'

export default function LoginPage() {

  console.log("LoginPage import.meta.env = ", import.meta.env)

  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !password) {
      toast.error('Fill your data')
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      toast.error('Invalid email')
      return
    }

    if (password.length < 6) {
      toast.error('Password must be 6 symbols or longer')
      return
    }

    try {
      setLoading(true)
      await login({ email, password })
      toast.success('Success')
      setTimeout(() => window.location.href = '/', 1000)
    } catch (err) {
      toast.error('Error in login')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto">
      <h2 className="text-xl mb-4">Login</h2>
      <input
        className="w-full mb-2 border p-2"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        required
      />
      <input
        className="w-full mb-2 border p-2"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        required
      />
      <button
        className="bg-green-600 text-white px-4 py-2 rounded"
        type="submit"
        disabled={loading}
      >
        {loading ? 'Loading...' : 'Login'}
      </button>
    </form>
  )
}
