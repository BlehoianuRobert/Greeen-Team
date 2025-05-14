// src/components/Card.tsx
import React, { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
}

export function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={
        "bg-[#1A1A1A] border border-gray-700 rounded-lg p-6 shadow-sm " +
        className
      }
    >
      {children}
    </div>
  )
}
