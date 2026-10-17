import type { ButtonHTMLAttributes } from 'react'
import './Button.css'

export type ButtonVariant = 'primary' | 'secondary'
export type ButtonSize = 'sm' | 'md'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
}

const VARIANT_CLASS: Record<ButtonVariant, string> = {
  primary: 'button--primary',
  secondary: 'button--secondary',
}

const SIZE_CLASS: Record<ButtonSize, string> = {
  sm: 'button--sm',
  md: 'button--md',
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled,
  type = 'button',
  className,
  children,
  ...rest
}: ButtonProps) {
  const classes = ['button', VARIANT_CLASS[variant], SIZE_CLASS[size], className].filter(Boolean).join(' ')

  return (
    <button type={type} className={classes} disabled={disabled || loading} aria-busy={loading || undefined} {...rest}>
      {loading && <span className="button__spinner" aria-hidden="true" />}
      {children}
    </button>
  )
}