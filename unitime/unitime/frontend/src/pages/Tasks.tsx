// src/pages/Tasks.tsx
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../services/api'

interface Task {
  id: number
  title: string
  completed: boolean
}

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    api.get<Task[]>('/tasks')
      .then(res => setTasks(res.data))
      .catch(err => setError(err.response?.data || err.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p style={{ padding: 20 }}>Loading tasks…</p>
  if (error) return <p style={{ padding: 20, color: 'red' }}>Error: {error}</p>

  return (
    <div style={{ padding: 20, maxWidth: 600, margin: 'auto' }}>
      <h1>Your Tasks</h1>
      <Link to="/tasks/new" style={{ display: 'inline-block', marginBottom: 16 }}>
        + New Task
      </Link>
      <ul>
        {tasks.map(t => (
          <li key={t.id} style={{ marginBottom: 8 }}>
            <Link to={`/tasks/${t.id}`} style={{ textDecoration: 'none' }}>
              {t.completed ? '✅' : '⬜️'}&nbsp; {t.title || <em>(no title)</em>}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
