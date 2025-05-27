/* 'use client'

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
 */
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
  const [filtroAsociado, setFiltroAsociado] = useState('')
  const [filtroLibro, setFiltroLibro] = useState('')

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
      setFiltroAsociado('')
      setFiltroLibro('')
      onSuccess()
    } else {
      const data = await res.json()
      setMensaje(data.error || 'Error al registrar el préstamo')
    }
  }

  const asociadosFiltrados = asociados.filter(a =>
    `${a.apellido} ${a.nombre}`.toLowerCase().includes(filtroAsociado.toLowerCase())
  )

  const librosFiltrados = libros.filter(l =>
    l.titulo.toLowerCase().includes(filtroLibro.toLowerCase())
  )

  return (
    <form onSubmit={handleSubmit} className="prestamo-form">
      <h3>Registrar nuevo préstamo</h3>

<input
  type="text"
  placeholder="Buscar asociado por nombre o apellido"
  value={
    asociadoId
      ? asociados.find(a => a.id === Number(asociadoId))?.apellido + ', ' + asociados.find(a => a.id === Number(asociadoId))?.nombre
      : filtroAsociado
  }
  onChange={(e) => {
    setFiltroAsociado(e.target.value)
    setAsociadoId('') // limpiar selección si se empieza a escribir
  }}
/>
<ul className="busqueda-lista">
  {filtroAsociado &&
    asociadosFiltrados.slice(0, 5).map(a => (
      <li key={a.id} onClick={() => {
        setAsociadoId(a.id.toString())
        setFiltroAsociado('') // limpiar resultados
      }}>
        {a.apellido}, {a.nombre}
      </li>
    ))}
</ul>

<input
  type="text"
  placeholder="Buscar libro por título"
  value={
    libroId
      ? libros.find(l => l.id === Number(libroId))?.titulo + (libros.find(l => l.id === Number(libroId))?.autor ? ` (${libros.find(l => l.id === Number(libroId))?.autor})` : '')
      : filtroLibro
  }
  onChange={(e) => {
    setFiltroLibro(e.target.value)
    setLibroId('') // limpiar selección si se empieza a escribir
  }}
/>
<ul className="busqueda-lista">
  {filtroLibro &&
    librosFiltrados.slice(0, 5).map(l => (
      <li key={l.id} onClick={() => {
        setLibroId(l.id.toString())
        setFiltroLibro('')
      }}>
        {l.titulo}{l.autor ? ` (${l.autor})` : ''}
      </li>
    ))}
</ul>


      <button type="submit">Confirmar préstamo</button>
      {mensaje && <p className="mensaje-error">{mensaje}</p>}
    </form>
  )
}
