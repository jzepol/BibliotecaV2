'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import '@/styles/LoginForm.css'

export default function LoginForm() {
  const router = useRouter()
  const { isAuthenticated } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email.includes('@') || password.length < 4) {
      setError('Email o contraseña inválidos')
      return
    }

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      if (res.ok) {
        // Forzar una recarga completa de la página para actualizar el estado
        window.location.href = '/dashboard'
      } else {
        const data = await res.json()
        setError(data.error || 'Error al iniciar sesión')
      }
    } catch {
      setError('Error de red')
    }
  }

  // Si ya está autenticado, redirigir al dashboard
  if (isAuthenticated) {
    router.push('/dashboard')
    return null
  }

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-box">
        <h2>Iniciar sesión</h2>

        {error && <p className="login-error">{error}</p>}

        <div className="login-field">
          <label htmlFor="email">Correo electrónico</label>
          <input
            type="email"
            id="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        <div className="login-field">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="login-submit">Ingresar</button>
      </form>
    </div>
  )
}
