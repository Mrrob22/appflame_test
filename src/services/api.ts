import axios from 'axios'

// @ts-ignore
console.log("api import.meta.env = ", import.meta.env)

export const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
})