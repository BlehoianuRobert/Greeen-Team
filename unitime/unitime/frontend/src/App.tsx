// src/App.tsx
import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

// layout + pagini
import Layout from './components/Layout'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Tasks from './pages/Tasks'
import NewTask from './pages/NewTask'
import TaskDetail from './pages/TaskDetail'
import Notes from './pages/Notes'
import NewNote from './pages/NewNote'
import NoteDetail from './pages/NoteDetail'
import Orar from './pages/Orar'
import NewOrar from './pages/NewOrar'
import OrarDetail from './pages/OrarDetail'
import Profile from './pages/Profile'
import ChangePassword from './pages/ChangePassword'

export default function App() {
  return (
    <Routes>
      {/* ruta rădăcină → login */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* pagini publice */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* toate rutele care trebuie protejate */}
      <Route element={<Layout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/tasks/new" element={<NewTask />} />
        <Route path="/tasks/:id" element={<TaskDetail />} />

        <Route path="/notes" element={<Notes />} />
        <Route path="/notes/new" element={<NewNote />} />
        <Route path="/notes/:id" element={<NoteDetail />} />

        <Route path="/orar" element={<Orar />} />
        <Route path="/orar/new" element={<NewOrar />} />
        <Route path="/orar/:id" element={<OrarDetail />} />

        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/change-password" element={<ChangePassword />} />
      </Route>

      {/* fallback pentru rute necunoscute */}
      <Route path="*" element={<h2 className="text-center mt-20">Page not found</h2>} />
    </Routes>
  )
}
