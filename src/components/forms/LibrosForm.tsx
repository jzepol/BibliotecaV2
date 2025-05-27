'use client'

import { useState } from 'react'

interface LibroFormProps {
  onSuccess: () => void
  onClose: () => void
}

export default function LibrosForm({ onSuccess, onClose }: LibroFormProps) {
  const [formData, setFormData] = useState({
    titulo: '',
    ISBN: '',
    autor: '',
    subtitulo: '',
    edicion: '',
    lugar: '',
    editorial: '',
    fechaPublicacion: '',
    extension: '',
    caracteristicas: '',
    volumen: '',
    materia: '',
    bibliotecario: '',
    cutter: '',
    st: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.titulo.trim()) return alert('El título es obligatorio')

        const payload = {
      ...formData,
      st: formData.st ? parseInt(formData.st, 10) : undefined, // solo lo manda si es válido
    }

    const res = await fetch('/api/catalogo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })


    if (res.ok) {
      setFormData({
        titulo: '',
        ISBN: '',
        autor: '',
        subtitulo: '',
        edicion: '',
        lugar: '',
        editorial: '',
        fechaPublicacion: '',
        extension: '',
        caracteristicas: '',
        volumen: '',
        materia: '',
        bibliotecario: '',
        cutter: '',
        st: '',
      })
      onSuccess()
      onClose()
    } else {
      alert('Error al registrar el libro')
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <h3>Nuevo Libro</h3>
        <form onSubmit={handleSubmit}>
          {Object.entries(formData).map(([name, value]) => (
            <input
              key={name}
              name={name}
              placeholder={name.charAt(0).toUpperCase() + name.slice(1).replace(/([A-Z])/g, ' $1')}
              value={value}
              onChange={handleChange}
            />
          ))}
          <button type="submit">Guardar</button>
          <button type="button" onClick={onClose}>Cancelar</button>
        </form>
      </div>
    </div>
  )
}
