import { useState } from 'react'
import { api } from '../services/api'
import type { LoginDto } from '../types/auth'

export function useAuth() {
  const [token, setToken] = useState(() => localStorage.getItem('token') || '')
  const [isLoggedIn, setIsLoggedIn] = useState(!!token)

  const login = async (data: LoginDto) => {
    const response = await api.post('/auth/login', data)
    const token = response.data.access_token
    localStorage.setItem('token', token)
    setToken(token)
    setIsLoggedIn(true)
  }

  const register = async (data: LoginDto) => {
    const response = await api.post('/auth/register', data)
    const token = response.data.access_token
    localStorage.setItem('token', token)
    setToken(token)
    setIsLoggedIn(true)
  }

  const logout = () => {
    localStorage.removeItem('token')
    setToken('')
    setIsLoggedIn(false)
  }

  return { token, isLoggedIn, login, register, logout }
}