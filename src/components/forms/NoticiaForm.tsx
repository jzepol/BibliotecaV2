'use client'

import { useEffect, useState } from 'react'
import '@/styles/NoticiaForm.css'

export interface Noticia {
  id?: number
  titulo: string
  contenido: string
  imagenUrl: string  
}


type Props = {
  noticiaEditada?: Noticia
  onNoticiaGuardada: () => void
}

export default function NoticiaForm({ noticiaEditada, onNoticiaGuardada }: Props) {
  const [titulo, setTitulo] = useState('')
  const [contenido, setContenido] = useState('')
  const [imagen, setImagen] = useState<File | null>(null)
  const [imagenUrl, setImagenUrl] = useState('')
  const [subiendo, setSubiendo] = useState(false)

  useEffect(() => {
    if (noticiaEditada) {
      setTitulo(noticiaEditada.titulo)
      setContenido(noticiaEditada.contenido)
      setImagenUrl(noticiaEditada.imagenUrl || '')
    } else {
    
      setTitulo('')
      setContenido('')
      setImagen(null)
      setImagenUrl('')
    }
  }, [noticiaEditada])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubiendo(true)

    let finalUrl = imagenUrl

    if (imagen) {
      const formData = new FormData()
      formData.append('file', imagen)
      formData.append('upload_preset', 'biblioteca') // tu preset de Cloudinary

      const res = await fetch('https://api.cloudinary.com/v1_1/dtkk8ader/image/upload', {
        method: 'POST',
        body: formData,
      })

      const data = await res.json()

      if (!res.ok) {
        alert('Error al subir la imagen a Cloudinary.')
        console.error(data)
        setSubiendo(false)
        return
      }

      finalUrl = data.secure_url
    }

    const body = JSON.stringify({
      titulo,
      contenido,
      imagenUrl: finalUrl || '', 

    })

    const res = await fetch(
      noticiaEditada ? `/api/noticias/${noticiaEditada.id}` : '/api/noticias',
      {
        method: noticiaEditada ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
      }
    )

    if (!res.ok) {
      const err = await res.json()
      alert(`Error al guardar la noticia: ${err.error}`)
    } else {
      alert(noticiaEditada ? 'Noticia actualizada ✅' : 'Noticia publicada ✅')
      setTitulo('')
      setContenido('')
      setImagen(null)
      setImagenUrl('')
      onNoticiaGuardada()
    }

    setSubiendo(false)
  }

  return (
    <form onSubmit={handleSubmit} className="noticia-form">
      <h2>{noticiaEditada ? 'Editar Noticia' : 'Nueva Noticia'}</h2>

      <input
        type="text"
        placeholder="Título de la noticia"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        required
      />

      <textarea
        placeholder="Contenido..."
        value={contenido}
        onChange={(e) => setContenido(e.target.value)}
        required
      />

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImagen(e.target.files?.[0] || null)}
      />

      <button type="submit" disabled={subiendo}>
        {subiendo ? 'Guardando...' : noticiaEditada ? 'Guardar Cambios' : 'Publicar Noticia'}
      </button>
    </form>
  )
}
