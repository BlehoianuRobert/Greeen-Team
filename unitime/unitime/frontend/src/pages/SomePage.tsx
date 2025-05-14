// src/pages/SomePage.tsx
import React, { useEffect, useState } from 'react'
import { api } from '../services/apiClient'

// randomness helper for stars/clouds
const rand = (min: number, max: number) => Math.random() * (max - min) + min

interface UserProfile {
    username: string
    email: string
}

export function ProfilePage() {
    const [profile, setProfile] = useState<UserProfile | null>(null)

    // inject animated background once
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

        for (let i = 0; i < 150; i++) {
            const star = document.createElement('div')
            star.className = 'star'
            const x = rand(0, 100), y = rand(0, 100),
                sz = rand(0.5, 3), op = rand(0.2, 0.9),
                dur = rand(2, 6), del = rand(0, 5)
            star.style.cssText = `
        left:${x}%; top:${y}%;
        width:${sz}px; height:${sz}px;
        opacity:${op};
        animation:twinkle ${dur}s infinite alternate;
        animation-delay:${del}s;
      `
            starsEl.appendChild(star)
        }

        for (let i = 0; i < 12; i++) {
            const cloud = document.createElement('div')
            cloud.className = 'cloud'
            const x = rand(0, 100), y = rand(0, 40),
                w = rand(100, 400), h = rand(50, 150),
                op = rand(0.05, 0.25)
            cloud.style.cssText = `
        left:${x}%; top:${y}%;
        width:${w}px; height:${h}px;
        opacity:${op};
      `
            cloudsEl.appendChild(cloud)
        }
    }, [])

    // fetch profile
    useEffect(() => {
        api.getProfile()
            .then(res => setProfile(res.data))
            .catch(err => console.error(err))
    }, [])

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
                width: '400px',
                maxWidth: '90%',
                boxShadow: '0 15px 35px rgba(0,0,0,0.3)',
                color: 'white',
                textAlign: 'left'
            }}>
                <h1 style={{
                    fontSize: '2rem',
                    marginBottom: '16px',
                    textShadow: '0 2px 5px rgba(0,0,0,0.3)'
                }}>Profil</h1>
                <p style={{ marginBottom: '12px' }}><strong>Username:</strong> {profile.username}</p>
                <p style={{ marginBottom: '12px' }}><strong>Email:</strong> {profile.email}</p>
            </div>
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
