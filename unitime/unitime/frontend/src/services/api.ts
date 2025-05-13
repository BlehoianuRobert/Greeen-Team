// src/services/api.ts
import axios from 'axios'

const token = () => localStorage.getItem('token')

export const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  }
})

// Adaugă interceptor pentru a pune automat header-ul Authorization
api.interceptors.request.use(config => {
  const t = token()
  if (t) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${t}`
    }
  }
  return config
})
