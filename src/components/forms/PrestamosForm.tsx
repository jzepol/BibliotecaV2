'use client'

import { useEffect, useState } from 'react'

interface Asociado {
  id: number
  nombre: string
  apellido: string
  categoria: string
}

interface Libro {
  id: number
  titulo: string
  autor?: string
  ISBN?: string
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
  const [loading, setLoading] = useState(false)

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
    if (loading) return
    setMensaje(null)

    if (!asociadoId || !libroId) {
      setMensaje('Debe seleccionar un asociado y un libro')
      return
    }

    const asociadoSeleccionado = asociados.find(a => a.id === Number(asociadoId))
    if (asociadoSeleccionado && asociadoSeleccionado.categoria === 'DE_BAJA') {
      alert('El asociado está dado de baja. Debe regularizar su situación para poder tomar prestado un libro.')
      return
    }

    setLoading(true)

    try {
      const res = await fetch('/api/prestamos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          asociadoId: Number(asociadoId),
          libroId: Number(libroId),
        }),
      })

      const data = await res.json()

      if (res.ok) {
        setAsociadoId('')
        setLibroId('')
        setFiltroAsociado('')
        setFiltroLibro('')
        setMensaje(null)
        onSuccess()
      } else {
        setMensaje(data.error || 'Error al registrar el préstamo')
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setMensaje('Error al conectar con el servidor')
    } finally {
      setLoading(false)
    }
  }

  const asociadosFiltrados = asociados.filter(a =>
    `${a.apellido} ${a.nombre}`.toLowerCase().includes(filtroAsociado.toLowerCase())
  )

  const librosFiltrados = libros.filter(l => {
    const filtroLower = filtroLibro.toLowerCase();
    return (
      l.titulo.toLowerCase().includes(filtroLower) ||
      (l.ISBN && l.ISBN.toLowerCase().includes(filtroLower))
    );
  })

  return (
    <form onSubmit={handleSubmit} className="prestamo-form">
      <h3>Registrar nuevo préstamo</h3>

      <input
        type="text"
        placeholder="Buscar asociado por nombre o apellido"
        value={
          asociadoId
            ? asociados.find(a => a.id === Number(asociadoId))?.apellido + ', ' +
              asociados.find(a => a.id === Number(asociadoId))?.nombre
            : filtroAsociado
        }
        onChange={(e) => {
          setFiltroAsociado(e.target.value)
          setAsociadoId('')
        }}
      />
      <ul className="busqueda-lista">
        {filtroAsociado &&
          asociadosFiltrados.slice(0, 5).map(a => (
            <li key={a.id} onClick={() => {
              setAsociadoId(a.id.toString())
              setFiltroAsociado('')
            }}>
              {a.apellido}, {a.nombre}
            </li>
          ))}
      </ul>

      <input
        type="text"
        placeholder="Buscar libro por título o ISBN"
        value={
          libroId
            ? libros.find(l => l.id === Number(libroId))?.titulo +
              (libros.find(l => l.id === Number(libroId))?.autor
                ? ` (${libros.find(l => l.id === Number(libroId))?.autor})`
                : '') +
              (libros.find(l => l.id === Number(libroId))?.ISBN
                ? ` (ISBN: ${libros.find(l => l.id === Number(libroId))?.ISBN})`
                : '')
            : filtroLibro
        }
        onChange={(e) => {
          setFiltroLibro(e.target.value)
          setLibroId('')
        }}
      />
      <ul className="busqueda-lista">
        {filtroLibro &&
          librosFiltrados.slice(0, 5).map(l => (
            <li key={l.id} onClick={() => {
              setLibroId(l.id.toString())
              setFiltroLibro('')
            }}>
              {l.titulo}{l.autor ? ` (${l.autor})` : ''}{l.ISBN ? ` (ISBN: ${l.ISBN})` : ''}
            </li>
          ))}
      </ul>

      <button type="submit" disabled={loading}>
        {loading ? 'Procesando...' : 'Confirmar préstamo'}
      </button>

      {mensaje && <p className="mensaje-error">{mensaje}</p>}
    </form>
  )
}
