import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../services/api'
import { Card } from '../components/Card'
import { Button } from '../components/Button'

// Helper to get random number
const rand = (min: number, max: number) => Math.random() * (max - min) + min

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    // Inject background containers
    const bg = document.createElement('div')
    bg.className = 'background'
    bg.innerHTML = `
      <div class="stars" id="stars"></div>
      <div class="clouds" id="clouds"></div>
    `
    document.body.prepend(bg)

    const starsEl = document.getElementById('stars')!
    const cloudsEl = document.getElementById('clouds')!

    // Create stars
    for (let i = 0; i < 150; i++) {
      const star = document.createElement('div')
      star.className = 'star'
      const x = rand(0, 100)
      const y = rand(0, 100)
      const size = rand(0.5, 3)
      const opacity = rand(0.2, 0.9)
      const duration = rand(2, 6)
      const delay = rand(0, 5)
      star.style.cssText = `
        left: ${x}%;
        top: ${y}%;
        width: ${size}px;
        height: ${size}px;
        opacity: ${opacity};
        animation: twinkle ${duration}s infinite alternate;
        animation-delay: ${delay}s;
      `
      starsEl.appendChild(star)
    }

    // Create clouds
    for (let i = 0; i < 12; i++) {
      const cloud = document.createElement('div')
      cloud.className = 'cloud'
      const x = rand(0, 100)
      const y = rand(0, 100)
      const width = rand(100, 400)
      const height = rand(50, 150)
      const opacity = rand(0.05, 0.25)
      cloud.style.cssText = `
        left: ${x}%;
        top: ${y}%;
        width: ${width}px;
        height: ${height}px;
        opacity: ${opacity};
      `
      cloudsEl.appendChild(cloud)
    }

    // Focus/Blur on inputs
    const inputs = document.querySelectorAll('.input-field')
    inputs.forEach(input => {
      const wrapper = input.parentElement
      const onFocus = () => wrapper?.classList.add('focused')
      const onBlur = () => { if (!(input as HTMLInputElement).value) wrapper?.classList.remove('focused') }
      input.addEventListener('focus', onFocus)
      input.addEventListener('blur', onBlur)
      // cleanup
      return () => {
        input.removeEventListener('focus', onFocus)
        input.removeEventListener('blur', onBlur)
      }
    })
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('Logging in…')
    try {
      const { data } = await api.post('/auth/login', { username, password })
      localStorage.setItem('token', data.jwtToken)
      navigate('/dashboard', { replace: true })
    } catch (err: any) {
      setMessage('Error: ' + (err.response?.data || err.message))
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="fixed inset-0 flex items-center justify-center bg-transparent">
      <div className={`login-container${loading ? ' loading' : ''}`}>
        <h1 className="login-title">Login</h1>
        <p className="login-subtitle">Conectează-te la contul tău</p>
        <div className="social-login">
          {/* social icons here if desired */}
        </div>
        <form onSubmit={handleLogin} className="space-y-5">
          <div className="input-group">
            <input
              id="username"
              type="text"
              className="input-field"
              placeholder="Username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <input
              id="password"
              type="password"
              className="input-field"
              placeholder="Parolă"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="remember-forgot">
            <label className="remember-me">
              <input type="checkbox" /> Ține-mă minte
            </label>
            <a href="#" className="forgot-password">Ai uitat parola?</a>
          </div>
          <Button type="submit" className="login-btn" disabled={loading}>
            {loading ? 'Se conectează…' : 'Conectare'}
          </Button>
        </form>
        {message && <p className="mt-4 text-center text-red-500">{message}</p>}
        <div className="register-link">
          Nu ai cont?<a href="#">Înregistrează-te</a>
        </div>
      </div>
    </Card>
  )
}
