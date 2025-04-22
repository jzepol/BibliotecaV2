'use client'

import { useEffect, useState } from 'react'
import '@/styles/EventosForm.css'

interface Evento {
  id?: number
  titulo: string
  descripcion: string
  fecha: string
  estado: string
  imagenUrl?: string
}

export default function EventoForm({
  eventoEditado,
  onEventoGuardado,
}: {
  eventoEditado?: Evento
  onEventoGuardado: () => void
}) {
  const [titulo, setTitulo] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [fechaEvento, setFechaEvento] = useState('')
  const [estado, setEstado] = useState('PROXIMAMENTE')
  const [imagen, setImagen] = useState<File | null>(null)
  const [imagenUrl, setImagenUrl] = useState('')

  useEffect(() => {
    if (eventoEditado) {
      setTitulo(eventoEditado.titulo)
      setDescripcion(eventoEditado.descripcion)
      setFechaEvento(eventoEditado.fecha.slice(0, 10)) 
      setEstado(eventoEditado.estado)
      setImagenUrl(eventoEditado.imagenUrl || '')
    }
  }, [eventoEditado])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    let finalUrl = imagenUrl

    if (imagen) {
      const formData = new FormData()
      formData.append('file', imagen)
      formData.append('upload_preset', 'biblioteca')

      const res = await fetch('https://api.cloudinary.com/v1_1/dtkk8ader/image/upload', {
        method: 'POST',
        body: formData,
      })

      if (!res.ok) {
        alert('Error al subir la imagen a Cloudinary.')
        return
      }

      const data = await res.json()
      finalUrl = data.secure_url
    }

    const payload = {
      titulo,
      descripcion,
      fecha: fechaEvento,
      estado,
      imagenUrl: finalUrl,
    }

    const res = await fetch(
      eventoEditado
        ? `/api/eventos/${eventoEditado.id}`
        : '/api/eventos',
      {
        method: eventoEditado ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }
    )

    if (res.ok) {
      alert(eventoEditado ? 'Evento actualizado ✅' : 'Evento creado ✅')
      setTitulo('')
      setDescripcion('')
      setFechaEvento('')
      setEstado('PROXIMAMENTE')
      setImagen(null)
      setImagenUrl('')
      onEventoGuardado()
    } else {
      alert('Error al guardar el evento')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="evento-form">
      <h2>{eventoEditado ? 'Editar Evento' : 'Nuevo Evento'}</h2>

      <input
        type="text"
        placeholder="Título del evento"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        required
      />

      <textarea
        placeholder="Descripción"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        required
      />

      <input
        type="date"
        value={fechaEvento}
        onChange={(e) => setFechaEvento(e.target.value)}
        required
      />

      <select value={estado} onChange={(e) => setEstado(e.target.value)} required>
        <option value="PROXIMAMENTE">Próximamente</option>
        <option value="EN_CURSO">En curso</option>
        <option value="FINALIZADO">Finalizado</option>
      </select>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImagen(e.target.files?.[0] || null)}
      />

      <button type="submit">{eventoEditado ? 'Guardar Cambios' : 'Publicar Evento'}</button>
    </form>
  )
}
