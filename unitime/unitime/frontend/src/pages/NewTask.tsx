// src/pages/NewTask.tsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../services/api'

export default function NewTask() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState('')
  const nav = useNavigate()

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await api.post('/tasks', { title, description })
      nav('/tasks')
    } catch (err: any) {
      setError(err.response?.data || err.message)
    }
  }

  return (
    <div style={{ padding: 20, maxWidth: 500, margin: 'auto' }}>
      <h1>Create New Task</h1>
      <form onSubmit={handleCreate}>
        <div>
          <input
            placeholder="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            style={{ width: '100%', padding: 8, marginBottom: 8 }}
            required
          />
        </div>
        <div>
          <textarea
            placeholder="Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            style={{ width: '100%', padding: 8, marginBottom: 8 }}
          />
        </div>
        <button type="submit" style={{ padding: '8px 16px' }}>
          Create
        </button>
      </form>
      {error && <p style={{ color: 'red', marginTop: 16 }}>{error}</p>}
    </div>
  )
}
