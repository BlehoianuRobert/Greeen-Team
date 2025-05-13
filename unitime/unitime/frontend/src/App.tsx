// src/App.tsx
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Tasks from './pages/Tasks'
import TaskDetail from './pages/TaskDetail'
import NewTask from './pages/NewTask'


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/tasks" element={<Tasks />} />
	  <Route path="/tasks/new" element={<NewTask />} />
      <Route path="/tasks/:id" element={<TaskDetail />} />
      {/* ...restul rutelor */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}