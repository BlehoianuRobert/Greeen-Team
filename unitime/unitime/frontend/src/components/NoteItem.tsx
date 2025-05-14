// src/components/NoteItem.tsx
import { Link } from 'react-router-dom'
export default function NoteItem({ id, title }: any) {
  return (
    <li>
      <Link to={`/notes/${id}`}>{title}</Link>
    </li>
  )
}
