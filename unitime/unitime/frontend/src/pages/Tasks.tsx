// src/pages/Tasks.tsx
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../services/api'

// randomness helper
const rand = (min: number, max: number) => Math.random() * (max - min) + min

interface Task {
    id: number
    title: string
    completed: boolean
}

export default function Tasks() {
    const [tasks, setTasks] = useState<Task[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

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

        // generate stars
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
        // generate clouds
        for (let i = 0; i < 12; i++) {
            const cloud = document.createElement('div')
            cloud.className = 'cloud'
            const x = rand(0, 100), y = rand(0, 40),
                w = rand(100, 400), h = rand(50, 150), op = rand(0.05, 0.25)
            cloud.style.cssText = `
        left:${x}%; top:${y}%;
        width:${w}px; height:${h}px;
        opacity:${op};
      `
            cloudsEl.appendChild(cloud)
        }
    }, [])

    // fetch tasks
    useEffect(() => {
        api.get<Task[]>('/tasks')
            .then(res => setTasks(res.data))
            .catch(err => setError(err.response?.data || err.message))
            .finally(() => setLoading(false))
    }, [])

    if (loading) {
        return (
            <div style={{
                height: '100vh', display: 'flex',
                alignItems: 'center', justifyContent: 'center',
                background: '#000', color: 'white'
            }}>
                <p>Se încarcă task-urile…</p>
            </div>
        )
    }
    if (error) {
        return (
            <div style={{
                height: '100vh', display: 'flex',
                alignItems: 'center', justifyContent: 'center',
                background: '#000'
            }}>
                <div style={{
                    background: 'rgba(13,40,70,0.35)',
                    backdropFilter: 'blur(15px)',
                    borderRadius: '20px',
                    border: '1px solid rgba(255,255,255,0.15)',
                    padding: '30px',
                    color: 'white'
                }}>
                    <p style={{ color: '#ff6b6b' }}>Eroare: {error}</p>
                </div>
            </div>
        )
    }

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
                }}>Task-urile tale</h1>

                <Link to="/tasks/new" style={{
                    display: 'inline-block',
                    marginBottom: '1.5rem',
                    padding: '0.5rem 1rem',
                    borderRadius: '50px',
                    background: 'linear-gradient(45deg,#3d65db,#5643cc)',
                    color: 'white',
                    textDecoration: 'none',
                    fontWeight: 600,
                    transition: 'background 0.3s'
                }}>
                    + Task nou
                </Link>

                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {tasks.map(t => (
                        <li key={t.id} style={{
                            marginBottom: '1rem',
                            background: 'rgba(22,55,90,0.5)',
                            borderRadius: 12,
                            padding: '0.75rem 1rem',
                            display: 'flex',
                            alignItems: 'center'
                        }}>
                            <Link to={`/tasks/${t.id}`} style={{
                                color: 'white',
                                textDecoration: 'none',
                                fontSize: '1rem',
                                flex: 1
                            }}>
                                {t.completed ? '✅' : '⬜️'} {t.title || <em>(fără titlu)</em>}
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
