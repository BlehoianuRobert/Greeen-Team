// src/pages/Register.tsx
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../services/api'

// randomness helper
const rand = (min: number, max: number) => Math.random() * (max - min) + min

export default function Register() {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState<'STUDENT' | 'PROFESSOR' | 'ADMIN'>('STUDENT')
    const [message, setMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    // Inject background + stars & clouds
    useEffect(() => {
        const bg = document.createElement('div')
        bg.className = 'background'
        bg.innerHTML = `
      <div class="stars" id="stars"></div>
      <div class="clouds" id="clouds"></div>
    `
        document.body.prepend(bg)

        const starsEl = document.getElementById('stars')!
        const cloudsEl = document.getElementById('clouds')!

        // create stars
        for (let i = 0; i < 150; i++) {
            const star = document.createElement('div')
            star.className = 'star'
            const x = rand(0, 100), y = rand(0, 100)
            const sz = rand(0.5, 3), op = rand(0.2, 0.9), dur = rand(2, 6), del = rand(0, 5)
            star.style.cssText = `
        left: ${x}%; top: ${y}%;
        width: ${sz}px; height: ${sz}px;
        opacity: ${op};
        animation: twinkle ${dur}s infinite alternate;
        animation-delay: ${del}s;
      `
            starsEl.appendChild(star)
        }

        // create clouds
        for (let i = 0; i < 12; i++) {
            const cloud = document.createElement('div')
            cloud.className = 'cloud'
            const x = rand(0, 100), y = rand(0, 40)
            const w = rand(100, 400), h = rand(50, 150), op = rand(0.05, 0.25)
            cloud.style.cssText = `
        left: ${x}%; top: ${y}%;
        width: ${w}px; height: ${h}px;
        opacity: ${op};
      `
            cloudsEl.appendChild(cloud)
        }
    }, [])

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setMessage('Se înregistrează…')
        try {
            await api.post('/auth/register', { username, email, password, role })
            setMessage('Înregistrare reușită! Verifică-ți emailul pentru confirmare.')
            setTimeout(() => navigate('/'), 2000)
        } catch (err: any) {
            setMessage('Eroare: ' + (err.response?.data?.message || err.message))
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div style={{
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
            position: 'relative',
            background: '#000'
        }}>
            {/* Form container */}
            <div className={`login-container${isLoading ? ' loading' : ''}`} style={{
                background: 'rgba(13,40,70,0.35)',
                backdropFilter: 'blur(15px)',
                borderRadius: '25px',
                border: '1px solid rgba(255,255,255,0.15)',
                padding: '48px 40px',
                width: '420px', maxWidth: '92%',
                boxShadow: '0 15px 35px rgba(0,0,0,0.3)',
                zIndex: 10,
                textAlign: 'center',
                transition: 'transform 0.4s ease-out, box-shadow 0.4s ease'
            }}>
                <h1 className="login-title" style={{
                    fontSize: '2.4rem', fontWeight: 600, color: 'white',
                    marginBottom: '12px', textShadow: '0 2px 5px rgba(0,0,0,0.3)'
                }}>Înregistrare</h1>
                <p className="login-subtitle" style={{
                    color: 'rgba(255,255,255,0.8)',
                    marginBottom: '36px', fontSize: '0.95rem'
                }}>Creează un cont nou pentru a continua</p>

                <form onSubmit={handleRegister}>
                    {/* Username */}
                    <div style={{ marginBottom: '25px', position: 'relative' }}>
                        <i className="fas fa-user" style={{
                            position: 'absolute', left: '20px', top: '14px',
                            color: 'rgba(255,255,255,0.6)', fontSize: '18px'
                        }} />
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            required
                            className="input-field"
                            style={{
                                width: '100%',
                                padding: '15px 20px 15px 48px',
                                borderRadius: '50px',
                                border: '1.5px solid rgba(255,255,255,0.15)',
                                background: 'rgba(255,255,255,0.08)',
                                color: 'white',
                                fontSize: '16px',
                                outline: 'none',
                                transition: 'all 0.3s ease'
                            }}
                        />
                    </div>

                    {/* Email */}
                    <div style={{ marginBottom: '25px', position: 'relative' }}>
                        <i className="fas fa-envelope" style={{
                            position: 'absolute', left: '20px', top: '14px',
                            color: 'rgba(255,255,255,0.6)', fontSize: '18px'
                        }} />
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                            className="input-field"
                            style={{
                                width: '100%',
                                padding: '15px 20px 15px 48px',
                                borderRadius: '50px',
                                border: '1.5px solid rgba(255,255,255,0.15)',
                                background: 'rgba(255,255,255,0.08)',
                                color: 'white',
                                fontSize: '16px',
                                outline: 'none',
                                transition: 'all 0.3s ease'
                            }}
                        />
                    </div>

                    {/* Password */}
                    <div style={{ marginBottom: '25px', position: 'relative' }}>
                        <i className="fas fa-lock" style={{
                            position: 'absolute', left: '20px', top: '14px',
                            color: 'rgba(255,255,255,0.6)', fontSize: '18px'
                        }} />
                        <input
                            type="password"
                            placeholder="Parolă"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                            className="input-field"
                            style={{
                                width: '100%',
                                padding: '15px 20px 15px 48px',
                                borderRadius: '50px',
                                border: '1.5px solid rgba(255,255,255,0.15)',
                                background: 'rgba(255,255,255,0.08)',
                                color: 'white',
                                fontSize: '16px',
                                outline: 'none',
                                transition: 'all 0.3s ease'
                            }}
                        />
                    </div>

                    {/* Role Dropdown */}
                    <div style={{ marginBottom: '25px', position: 'relative' }}>
                        <i className="fas fa-user-tag" style={{
                            position: 'absolute', left: '20px', top: '14px',
                            color: 'rgba(255,255,255,0.6)', fontSize: '18px'
                        }} />
                        <select
                            value={role}
                            onChange={e => setRole(e.target.value as any)}
                            className="input-field"
                            style={{
                                width: '100%',
                                padding: '15px 20px 15px 48px',
                                borderRadius: '50px',
                                border: '1.5px solid rgba(255,255,255,0.15)',
                                background: 'rgba(13,40,70,0.6)',
                                color: 'white',
                                fontSize: '16px',
                                outline: 'none',
                                transition: 'all 0.3s ease',
                                appearance: 'none'
                            }}
                        >
                            <option value="STUDENT">Student</option>
                            <option value="PROFESSOR">Profesor</option>
                            <option value="ADMIN">Administrator</option>
                        </select>
                        <i className="fas fa-chevron-down" style={{
                            position: 'absolute', right: '20px', top: '50%',
                            transform: 'translateY(-50%)', color: 'white',
                            pointerEvents: 'none'
                        }} />
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="login-btn"
                        style={{
                            width: '100%',
                            padding: '15px',
                            border: 'none',
                            borderRadius: '50px',
                            background: 'linear-gradient(45deg,#3d65db,#5643cc)',
                            color: 'white',
                            fontSize: '16px',
                            fontWeight: 600,
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            marginBottom: '28px',
                            boxShadow: '0 5px 15px rgba(86,67,204,0.4)'
                        }}
                    >
                        {isLoading ? 'Se procesează…' : 'Înregistrare'}
                    </button>

                    {/* Already have account */}
                    <div style={{
                        color: 'rgba(255,255,255,0.8)',
                        fontSize: '0.95rem'
                    }}>
                        Ai deja cont?
                        <a
                            href="/login"
                            onClick={e => { e.preventDefault(); navigate('/login') }}
                            style={{
                                color: 'white',
                                textDecoration: 'none',
                                fontWeight: 600,
                                marginLeft: '5px'
                            }}
                        >
                            Conectează-te
                        </a>
                    </div>
                </form>

                {/* Message */}
                {message && (
                    <div style={{
                        marginTop: '20px',
                        padding: '10px',
                        borderRadius: '10px',
                        backgroundColor: message.startsWith('Eroare')
                            ? 'rgba(255,87,87,0.2)'
                            : 'rgba(87,255,160,0.2)',
                        color: 'white'
                    }}>
                        {message}
                    </div>
                )}
            </div>

            {/* Inline keyframes & dropdown option theming */}
            <style>{`
        @keyframes gradientBG { 0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%} }
        @keyframes twinkle { 0%{opacity:0.2}50%{transform:scale(1.2)}100%{opacity:0.9} }
        .login-container:hover { transform: translateY(-5px); box-shadow:0 20px 40px rgba(0,0,0,0.4) }
        select.option-theming option {
          background: rgba(13,40,70,0.6) !important;
          color: white !important;
        }
        select::-webkit-scrollbar { width: 6px }
        select::-webkit-scrollbar-track { background: rgba(255,255,255,0.1) }
        select::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.3); border-radius:3px }
        select { scrollbar-width: thin; scrollbar-color: rgba(255,255,255,0.3) rgba(255,255,255,0.1) }
      `}</style>
        </div>
    )
}
