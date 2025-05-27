'use client'

import { useEffect, useState } from 'react'
import '@/styles/TallerForm.css'

interface Taller {
  id?: number
  titulo: string
  descripcion: string
  fecha: string
  hora: string
  facilitador: string
  imagenUrl?: string
}

export default function TallerForm({
  tallerEditado,
  onTallerGuardado,
}: {
  tallerEditado?: Taller
  onTallerGuardado: () => void
}) {
  const [titulo, setTitulo] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [fecha, setFecha] = useState('')
  const [hora, setHora] = useState('')
  const [facilitador, setFacilitador] = useState('')
  const [imagen, setImagen] = useState<File | null>(null)
  const [imagenUrl, setImagenUrl] = useState('')
  const [subiendo, setSubiendo] = useState(false)

  useEffect(() => {
    if (tallerEditado) {
      setTitulo(tallerEditado.titulo)
      setDescripcion(tallerEditado.descripcion)
      setFecha(tallerEditado.fecha.split('T')[0])
      setHora(tallerEditado.hora)
      setFacilitador(tallerEditado.facilitador)
      setImagenUrl(tallerEditado.imagenUrl || '')
    } else {
      setTitulo('')
      setDescripcion('')
      setFecha('')
      setHora('')
      setFacilitador('')
      setImagen(null)
      setImagenUrl('')
    }
  }, [tallerEditado])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubiendo(true)

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
        alert('Error al subir la imagen')
        setSubiendo(false)
        return
      }

      const data = await res.json()
      finalUrl = data.secure_url
    }

    const payload = {
      titulo,
      descripcion,
      fecha,
      hora,
      facilitador,
      imagenUrl: finalUrl,
    }

    try {
      const res = await fetch(
        tallerEditado ? `/api/talleres/${tallerEditado.id}` : '/api/talleres',
        {
          method: tallerEditado ? 'PUT' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }
      )

      if (res.ok) {
        alert(tallerEditado ? 'Taller actualizado ✅' : 'Taller creado ✅')
        onTallerGuardado()
        setTitulo('')
        setDescripcion('')
        setFecha('')
        setHora('')
        setFacilitador('')
        setImagen(null)
        setImagenUrl('')
      } else {
        throw new Error('Error al guardar el taller')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Error al guardar el taller')
    } finally {
      setSubiendo(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="taller-form">
      <h2>{tallerEditado ? 'Editar Taller' : 'Nuevo Taller'}</h2>

      <input
        type="text"
        placeholder="Título"
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
        value={fecha}
        onChange={(e) => setFecha(e.target.value)}
        required
      />
      <input
        type="time"
        value={hora}
        onChange={(e) => setHora(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Facilitador/a"
        value={facilitador}
        onChange={(e) => setFacilitador(e.target.value)}
        required
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImagen(e.target.files?.[0] || null)}
      />
      <button type="submit" disabled={subiendo}>
        {subiendo ? 'Guardando...' : tallerEditado ? 'Guardar Cambios' : 'Publicar Taller'}
      </button>
    </form>
  )
}
