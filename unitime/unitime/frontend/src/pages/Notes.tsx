// src/pages/Notes.tsx
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../services/api'

// randomness helper for background
const rand = (min: number, max: number) => Math.random() * (max - min) + min

interface Note { id: number; title: string }

export default function Notes() {
    const [notes, setNotes] = useState<Note[]>([])

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

    useEffect(() => {
        api.get<Note[]>('/notes')
            .then(res => setNotes(res.data))
            .catch(() => {/* error handling if needed */ })
    }, [])

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            position: 'relative',
            overflow: 'hidden',
            background: '#000',
            padding: '2rem 1rem'
        }}>
            <div style={{
                width: '100%',
                maxWidth: 600,
                background: 'rgba(13,40,70,0.35)',
                backdropFilter: 'blur(15px)',
                borderRadius: 20,
                border: '1px solid rgba(255,255,255,0.15)',
                padding: '2rem',
                boxShadow: '0 15px 35px rgba(0,0,0,0.3)',
                color: 'white'
            }}>
                <h1 style={{
                    fontSize: '2.2rem',
                    marginBottom: '1.5rem',
                    textShadow: '0 2px 5px rgba(0,0,0,0.3)'
                }}>Your Notes</h1>

                <Link to="/notes/new" style={{
                    display: 'inline-block',
                    marginBottom: '1.5rem',
                    padding: '0.5rem 1rem',
                    borderRadius: '50px',
                    background: 'linear-gradient(45deg,#3d65db,#5643cc)',
                    color: 'white',
                    textDecoration: 'none',
                    fontWeight: 600,
                    transition: 'background 0.3s, transform 0.2s'
                }}>
                    + New Note
                </Link>

                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {notes.map(n => (
                        <li key={n.id} style={{
                            marginBottom: '1rem',
                            background: 'rgba(22,55,90,0.5)',
                            borderRadius: 12,
                            padding: '0.75rem 1rem',
                            transition: 'background 0.3s'
                        }}>
                            <Link to={`/notes/${n.id}`} style={{
                                color: 'white',
                                textDecoration: 'none',
                                fontSize: '1.1rem'
                            }}>
                                {n.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Inline keyframes */}
            <style>{`
        @keyframes twinkle {
          0% { opacity: 0.2 }
          50% { transform: scale(1.2) }
          100% { opacity: 0.9 }
        }
      `}</style>
        </div>
    )
}
