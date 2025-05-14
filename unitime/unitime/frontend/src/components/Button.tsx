// src/components/Button.tsx
import React, { ButtonHTMLAttributes, ReactNode } from 'react'
import clsx from 'clsx'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'secondary'
}

export function Button({
  children,
  variant = 'primary',
  className,
  ...rest
}: ButtonProps) {
  return (
    <button
      {...rest}
      className={clsx(
        'px-4 py-2 rounded font-medium focus:outline-none focus:ring-2',
        {
          'bg-accent text-white hover:bg-accent/90 focus:ring-accent/50': variant === 'primary',
          'bg-[#1A1A1A] text-text-light hover:border-accent focus:ring-accent/50 border border-transparent':
            variant === 'secondary',
        },
        className
      )}
    >
      {children}
    </button>
  )
}
