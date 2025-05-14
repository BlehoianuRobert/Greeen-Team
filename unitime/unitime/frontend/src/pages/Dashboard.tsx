// src/pages/Dashboard.tsx
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../services/api'

const rand = (min: number, max: number) => Math.random() * (max - min) + min

export default function Dashboard() {
    const [profile, setProfile] = useState<{ username: string; email: string; role: string } | null>(null)
    const [error, setError] = useState('')
    const navigate = useNavigate()

    // Inject animated background
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

        // stars
        for (let i = 0; i < 150; i++) {
            const star = document.createElement('div')
            star.className = 'star'
            const x = rand(0, 100), y = rand(0, 100)
            const sz = rand(0.5, 3), op = rand(0.2, 0.9), dur = rand(2, 6), del = rand(0, 5)
            star.style.cssText = `
        left:${x}%; top:${y}%;
        width:${sz}px; height:${sz}px;
        opacity:${op};
        animation:twinkle ${dur}s infinite alternate;
        animation-delay:${del}s;
      `
            starsEl.appendChild(star)
        }
        // clouds
        for (let i = 0; i < 12; i++) {
            const cloud = document.createElement('div')
            cloud.className = 'cloud'
            const x = rand(0, 100), y = rand(0, 40)
            const w = rand(100, 400), h = rand(50, 150), op = rand(0.05, 0.25)
            cloud.style.cssText = `
        left:${x}%; top:${y}%;
        width:${w}px; height:${h}px;
        opacity:${op};
      `
            cloudsEl.appendChild(cloud)
        }
    }, [])

    // Fetch profile
    useEffect(() => {
        api.get('/profile')
            .then(res => setProfile(res.data))
            .catch(() => {
                setError('Not authorized')
                localStorage.removeItem('token')
                navigate('/login', { replace: true })
            })
    }, [])

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center" style={{ color: 'white' }}>
                <p style={{ background: 'rgba(255,87,87,0.2)', padding: 20, borderRadius: 8 }}>{error}</p>
            </div>
        )
    }

    if (!profile) {
        return (
            <div className="min-h-screen flex items-center justify-center" style={{ color: 'white' }}>
                <p>Loading profile…</p>
            </div>
        )
    }

    return (
        <div style={{
            minHeight: '100vh',
            padding: 20,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            overflow: 'hidden',
            background: '#000'
        }}>
            <div style={{
                width: '100%',
                maxWidth: 800,
                background: 'rgba(13,40,70,0.35)',
                backdropFilter: 'blur(15px)',
                borderRadius: 25,
                border: '1px solid rgba(255,255,255,0.15)',
                padding: 40,
                boxShadow: '0 15px 35px rgba(0,0,0,0.3)',
                color: 'white'
            }}>
                <h1 style={{
                    fontSize: '2.5rem',
                    marginBottom: 20,
                    textShadow: '0 2px 5px rgba(0,0,0,0.3)'
                }}>
                    Welcome, {profile.username}
                </h1>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: 20,
                    marginBottom: 30
                }}>
                    {/** Card component styled inline **/}
                    <div style={{
                        background: 'rgba(22,55,90,0.5)',
                        borderRadius: 15,
                        padding: 20,
                        boxShadow: '0 8px 20px rgba(0,0,0,0.2)'
                    }}>
                        <h2 style={{ fontSize: '1.25rem', marginBottom: 8 }}>Email</h2>
                        <p style={{ color: 'rgba(255,255,255,0.8)' }}>{profile.email}</p>
                    </div>
                    <div style={{
                        background: 'rgba(22,55,90,0.5)',
                        borderRadius: 15,
                        padding: 20,
                        boxShadow: '0 8px 20px rgba(0,0,0,0.2)'
                    }}>
                        <h2 style={{ fontSize: '1.25rem', marginBottom: 8 }}>Role</h2>
                        <p style={{ color: 'rgba(255,255,255,0.8)' }}>{profile.role}</p>
                    </div>
                </div>

                <button
                    onClick={() => {
                        localStorage.removeItem('token')
                        navigate('/login', { replace: true })
                    }}
                    style={{
                        padding: '14px 30px',
                        border: 'none',
                        borderRadius: 50,
                        background: 'linear-gradient(45deg,#3d65db,#5643cc)',
                        color: 'white',
                        fontSize: 16,
                        fontWeight: 600,    
                        cursor: 'pointer',
                        transition: 'transform 0.2s, box-shadow 0.2s',
                        boxShadow: '0 5px 15px rgba(86,67,204,0.4)'
                    }}
                >
                    Logout
                </button>
            </div>

            {/* inline keyframes */}
            <style>{`
        @keyframes gradientBG {
          0% { background-position:0% 50% }
          50% { background-position:100% 50% }
          100% { background-position:0% 50% }
        }
        @keyframes twinkle {
          0% { opacity:0.2 }
          50% { transform:scale(1.2) }
          100% { opacity:0.9 }
        }
      `}</style>
        </div>
    )
}
