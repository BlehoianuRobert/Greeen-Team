// src/pages/TaskDetail.tsx
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { api } from '../services/api'

interface Task {
  id: number
  title: string
  description: string
  completed: boolean
}

export default function TaskDetail() {
  const { id } = useParams<{ id: string }>()
  const [task, setTask] = useState<Task | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const nav = useNavigate()

  useEffect(() => {
    api.get<Task>(`/tasks/${id}`)
      .then(res => setTask(res.data))
      .catch(err => {
        // prindem 403 separat
        if (err.response?.status === 403) {
          setError('You are not allowed to view this task.')
        } else {
          setError(err.response?.data || err.message)
        }
      })
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <p style={{ padding: 20 }}>Loading task…</p>
  if (error)
    return (
      <div style={{ padding: 20 }}>
        <p style={{ color: 'red' }}>{error}</p>
        <button onClick={() => nav('/tasks')}>Back to tasks</button>
      </div>
    )
  if (!task) return <p style={{ padding: 20 }}>Task not found</p>

  return (
    <div style={{ padding: 20, maxWidth: 500, margin: 'auto' }}>
      <h1>Task #{task.id}</h1>
      <p><strong>Title:</strong> {task.title}</p>
      <p><strong>Description:</strong><br />{task.description}</p>
      <p><strong>Completed:</strong> {task.completed ? 'Yes' : 'No'}</p>
      <button onClick={() => nav('/tasks')} style={{ marginTop: 16 }}>
        Back to tasks
      </button>
    </div>
  )
}
