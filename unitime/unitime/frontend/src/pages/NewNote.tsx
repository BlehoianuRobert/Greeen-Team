// src/pages/NewNote.tsx
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../services/api'

// randomness helper for stars/clouds
const rand = (min: number, max: number) => Math.random() * (max - min) + min

export default function NewNote() {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
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

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault()
        await api.post('/notes', { title, content })
        navigate('/notes')
    }

    return (
        <div style={{
            height: '100vh',
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
                borderRadius: '25px',
                border: '1px solid rgba(255,255,255,0.15)',
                padding: '48px 40px',
                width: '500px',
                maxWidth: '90%',
                boxShadow: '0 15px 35px rgba(0,0,0,0.3)',
                color: 'white'
            }}>
                <h1 style={{
                    fontSize: '2.2rem',
                    marginBottom: '20px',
                    textShadow: '0 2px 5px rgba(0,0,0,0.3)'
                }}>Creează notiță</h1>

                <form onSubmit={handleCreate} style={{ display: 'grid', gap: '20px' }}>
                    {/* Title Input */}
                    <div style={{ position: 'relative' }}>
                        <i className="fas fa-heading" style={{
                            position: 'absolute', left: '16px', top: '50%',
                            transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.6)'
                        }} />
                        <input
                            type="text"
                            placeholder="Titlu"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            required
                            style={{
                                width: '100%',
                                padding: '14px 20px 14px 48px',
                                borderRadius: '50px',
                                border: '1.5px solid rgba(255,255,255,0.15)',
                                background: 'rgba(255,255,255,0.08)',
                                color: 'white',
                                fontSize: '16px',
                                outline: 'none',
                                transition: 'border 0.3s ease'
                            }}
                        />
                    </div>

                    {/* Content Textarea */}
                    <div style={{ position: 'relative' }}>
                        <i className="fas fa-align-left" style={{
                            position: 'absolute', left: '16px', top: '16px',
                            color: 'rgba(255,255,255,0.6)'
                        }} />
                        <textarea
                            placeholder="Conținut"
                            value={content}
                            onChange={e => setContent(e.target.value)}
                            required
                            rows={6}
                            style={{
                                width: '100%',
                                padding: '14px 20px 14px 48px',
                                borderRadius: '15px',
                                border: '1.5px solid rgba(255,255,255,0.15)',
                                background: 'rgba(255,255,255,0.08)',
                                color: 'white',
                                fontSize: '16px',
                                outline: 'none',
                                transition: 'border 0.3s ease',
                                resize: 'vertical'
                            }}
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        style={{
                            width: '100%',
                            padding: '14px',
                            border: 'none',
                            borderRadius: '50px',
                            background: 'linear-gradient(45deg,#3d65db,#5643cc)',
                            color: 'white',
                            fontSize: '16px',
                            fontWeight: 600,
                            cursor: 'pointer',
                            transition: 'transform 0.2s, box-shadow 0.2s',
                            boxShadow: '0 5px 15px rgba(86,67,204,0.4)'
                        }}
                    >
                        Creează
                    </button>
                </form>
            </div>

            {/* Inline keyframes */}
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
