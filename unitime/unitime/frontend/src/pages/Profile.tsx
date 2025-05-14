// src/pages/Profile.tsx
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../services/apiClient'

// randomness helper for animated background
const rand = (min: number, max: number) => Math.random() * (max - min) + min

export default function Profile() {
    const [profile, setProfile] = useState<any>(null)
    const navigate = useNavigate()

    // Inject animated background once
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
        left:${x}%; top:${y}%;
        width:${sz}px; height:${sz}px;
        opacity:${op};
        animation:twinkle ${dur}s infinite alternate;
        animation-delay:${del}s;
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
        left:${x}%; top:${y}%;
        width:${w}px; height:${h}px;
        opacity:${op};
      `
            cloudsEl.appendChild(cloud)
        }
    }, [])

    // Fetch profile
    useEffect(() => {
        api.apiProfileGet()
            .then(res => setProfile(res.data))
            .catch(() => {
                /* if unauthorized, redirect to login */
                localStorage.removeItem('token')
                navigate('/login', { replace: true })
            })
    }, [navigate])

    if (!profile) {
        return (
            <div style={{
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#000',
                color: 'white'
            }}>
                <p>Loading…</p>
            </div>
        )
    }

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            overflow: 'hidden',
            background: '#000'
        }}>
            <div style={{
                background: 'rgba(13,40,70,0.35)',
                backdropFilter: 'blur(15px)',
                borderRadius: '20px',
                border: '1px solid rgba(255,255,255,0.15)',
                padding: '40px',
                width: '450px',
                maxWidth: '90%',
                boxShadow: '0 15px 35px rgba(0,0,0,0.3)',
                color: 'white',
                textAlign: 'left'
            }}>
                <h1 style={{
                    fontSize: '2rem',
                    marginBottom: '16px',
                    textShadow: '0 2px 5px rgba(0,0,0,0.3)'
                }}>Profilul tău</h1>
                <p style={{ marginBottom: '12px' }}><strong>Username:</strong> {profile.username}</p>
                <p style={{ marginBottom: '12px' }}><strong>Email:</strong> {profile.email}</p>
                <p style={{ marginBottom: '24px' }}><strong>Role:</strong> {profile.role}</p>
                <button
                    onClick={() => navigate('/profile/change-password')}
                    style={{
                        padding: '12px 24px',
                        border: 'none',
                        borderRadius: '50px',
                        background: 'linear-gradient(45deg,#3d65db,#5643cc)',
                        color: 'white',
                        fontSize: 16,
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'transform 0.2s, box-shadow 0.2s',
                        boxShadow: '0 5px 15px rgba(86,67,204,0.4)',
                        marginRight: '10px'
                    }}
                >
                    Schimbă parola
                </button>
                <button
                    onClick={() => navigate('/dashboard')}
                    style={{
                        padding: '12px 24px',
                        border: 'none',
                        borderRadius: '50px',
                        background: 'rgba(255,255,255,0.1)',
                        color: 'white',
                        fontSize: 16,
                        fontWeight: 500,
                        cursor: 'pointer',
                        transition: 'background 0.3s',
                        boxShadow: '0 5px 15px rgba(0,0,0,0.2)'
                    }}
                >
                    Înapoi
                </button>
            </div>
            {/* Inline keyframes */}
            <style>{`
        @keyframes twinkle {
          0% { opacity: 0.2; }
          50% { transform: scale(1.2); }
          100% { opacity: 0.9; }
        }
      `}</style>
        </div>
    )
}
