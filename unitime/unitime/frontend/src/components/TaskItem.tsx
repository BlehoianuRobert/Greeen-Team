// src/components/TaskItem.tsx
import { Link } from 'react-router-dom'
export default function TaskItem({ id, title, completed }: any) {
  return (
    <li>
      <Link to={`/tasks/${id}`}>
        {completed ? '✅' : '⬜️'} {title || '(no title)'}
      </Link>
    </li>
  )
}
