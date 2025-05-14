// src/components/Layout.tsx
import React, { useEffect } from 'react'
import { Outlet, NavLink, useNavigate } from 'react-router-dom'

const rand = (min: number, max: number) =>
    Math.random() * (max - min) + min

export default function Layout() {
    const navigate = useNavigate()
    const isAuth = Boolean(localStorage.getItem('token'))

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

        // generate stars
        for (let i = 0; i < 150; i++) {
            const star = document.createElement('div')
            star.className = 'star'
            const x = rand(0, 100),
                y = rand(0, 100),
                sz = rand(0.5, 3),
                op = rand(0.2, 0.9),
                dur = rand(2, 6),
                del = rand(0, 5)
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
            const x = rand(0, 100),
                y = rand(0, 40),
                w = rand(100, 400),
                h = rand(50, 150),
                op = rand(0.05, 0.25)
            cloud.style.cssText = `
        left:${x}%; top:${y}%;
        width:${w}px; height:${h}px;
        opacity:${op};
      `
            cloudsEl.appendChild(cloud)
        }
    }, [])

    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate('/login', { replace: true })
    }

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            position: 'relative',
            overflow: 'hidden',
            background: '#000'
        }}>
            {isAuth && (
                <aside style={{
                    width: 240,
                    background: 'rgba(13,40,70,0.5)',
                    backdropFilter: 'blur(12px)',
                    borderRight: '1px solid rgba(255,255,255,0.1)',
                    padding: '2rem',
                    boxShadow: '2px 0 10px rgba(0,0,0,0.3)',
                    color: 'white'
                }}>
                    <h2 style={{
                        fontSize: '1.5rem',
                        fontWeight: 700,
                        marginBottom: '2rem'
                    }}>
                        Green Team
                    </h2>

                    {[
                        ['Dashboard', '/dashboard'],
                        ['Tasks', '/tasks'],
                        ['Notes', '/notes'],
                        ['Schedule', '/orar'],
                        ['Profile', '/profile'],
                    ].map(([label, to]) => (
                        <NavLink
                            key={to}
                            to={to}
                            style={({ isActive }) => ({
                                display: 'block',
                                padding: '0.75rem 1rem',
                                borderRadius: 8,
                                marginBottom: '0.75rem',
                                color: isActive ? 'white' : 'rgba(255,255,255,0.8)',
                                background: isActive
                                    ? 'linear-gradient(45deg,#3d65db,#5643cc)'
                                    : 'transparent',
                                textDecoration: 'none',
                                fontWeight: isActive ? 600 : 500,
                                transition: 'background 0.3s'
                            })}
                        >
                            {label}
                        </NavLink>
                    ))}

                    <button
                        onClick={handleLogout}
                        style={{
                            marginTop: '2rem',
                            width: '100%',
                            padding: '0.75rem 1rem',
                            border: 'none',
                            borderRadius: 8,
                            background: '#e74c3c',
                            color: 'white',
                            fontWeight: 600,
                            cursor: 'pointer',
                            transition: 'background 0.3s'
                        }}
                    >
                        Logout
                    </button>
                </aside>
            )}

            <main style={{
                flex: 1,
                padding: '2rem',
                overflowY: 'auto',
            }}>
                <div style={{
                    background: 'rgba(13,40,70,0.35)',
                    backdropFilter: 'blur(12px)',
                    borderRadius: 12,
                    border: '1px solid rgba(255,255,255,0.1)',
                    padding: '2rem',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
                    color: 'white',
                }}>
                    <Outlet />
                </div>
            </main>

            {/* global keyframes */}
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
