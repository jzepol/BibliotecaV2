'use client'

import { useEffect, useState } from 'react'

interface Asociado {
  id: number
  nombre: string
  apellido: string
}

interface Libro {
  id: number
  titulo: string
  autor?: string
}

interface PrestamoFormProps {
  onSuccess: () => void
}

export default function PrestamosForm({ onSuccess }: PrestamoFormProps) {
  const [asociados, setAsociados] = useState<Asociado[]>([])
  const [libros, setLibros] = useState<Libro[]>([])
  const [asociadoId, setAsociadoId] = useState('')
  const [libroId, setLibroId] = useState('')
  const [mensaje, setMensaje] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/asociados/all')
      .then(res => res.json())
      .then(setAsociados)
    fetch('/api/catalogo')
      .then(res => res.json())
      .then(setLibros)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMensaje(null)
    if (!asociadoId || !libroId) return setMensaje('Debe seleccionar un asociado y un libro')

    const res = await fetch('/api/prestamos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ asociadoId: Number(asociadoId), libroId: Number(libroId) })
    })

    if (res.ok) {
      setAsociadoId('')
      setLibroId('')
      onSuccess()
    } else {
      const data = await res.json()
      setMensaje(data.error || 'Error al registrar el préstamo')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="prestamo-form">
      <h3>Registrar nuevo préstamo</h3>

      <select value={asociadoId} onChange={e => setAsociadoId(e.target.value)}>
        <option value="">Seleccione un asociado</option>
        {asociados.map(a => (
          <option key={a.id} value={a.id}>{a.apellido}, {a.nombre}</option>
        ))}
      </select>

      <select value={libroId} onChange={e => setLibroId(e.target.value)}>
        <option value="">Seleccione un libro</option>
        {libros.map(l => (
          <option key={l.id} value={l.id}>{l.titulo}{l.autor ? ` (${l.autor})` : ''}</option>
        ))}
      </select>

      <button type="submit">Confirmar préstamo</button>
      {mensaje && <p className="mensaje-error">{mensaje}</p>}
    </form>
  )
}
