import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../services/api'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const nav = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage('Logging in…')
    try {
      const { data } = await api.post('/auth/login', { username, password })
      localStorage.setItem('token', data.jwtToken)
      setMessage('Login successful!')
      nav('/dashboard')
    } catch (err: any) {
      setMessage('Error: ' + (err.response?.data || err.message))
    }
  }

  return (
    <div style={{ padding: 20, maxWidth: 400, margin: 'auto' }}>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          style={{ width: '100%', padding: 8, marginBottom: 8 }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={{ width: '100%', padding: 8, marginBottom: 8 }}
        />
        <button type="submit" style={{ padding: '8px 16px' }}>
          Log in
        </button>
      </form>
      {message && <p style={{ marginTop: 16 }}>{message}</p>}
    </div>
  )
}
