import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../services/api'

export default function Dashboard() {
  const [profile, setProfile] = useState<any>(null)
  const [error, setError] = useState('')
  const nav = useNavigate()

  useEffect(() => {
    api.get('/profile')
      .then(res => setProfile(res.data))
      .catch(err => {
        setError('Not authorized')
        localStorage.removeItem('token')
        nav('/')
      })
  }, [])

  if (error) {
    return (
      <div style={{ padding: 20 }}>
        <p>{error}</p>
      </div>
    )
  }

  if (!profile) {
    return (
      <div style={{ padding: 20 }}>
        <p>Loading profile…</p>
      </div>
    )
  }

  return (
    <div style={{ padding: 20, maxWidth: 500, margin: 'auto' }}>
      <h1>Welcome, {profile.username}</h1>
      <p>Email: {profile.email}</p>
      <p>Role: {profile.role}</p>
      <button
        onClick={() => {
          localStorage.removeItem('token')
          nav('/')
        }}
        style={{ padding: '8px 16px', marginTop: 16 }}
      >
        Logout
      </button>
    </div>
  )
}
