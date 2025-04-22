'use client'

import { useEffect, useState } from 'react'
import '@/styles/components/AsociadoModal.css'
interface Asociado {
  id: number
  email: string
  apellido: string
  nombre: string
  dni: number
  fechaNacimiento: string
  direccion: string
  categoria: string
  escuela?: string
  curso?: string
  comentario?: string
}

interface Props {
  asociado: Asociado | null
  onClose: () => void
  onSave: () => void
}

export default function EditarAsociadoModal({ asociado, onClose, onSave }: Props) {
  const [form, setForm] = useState<Asociado | null>(null)

  useEffect(() => {
    if (asociado) setForm(asociado)
  }, [asociado])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    if (!form) return
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    if (!form) return
    const res = await fetch(`/api/asociados/${form.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    if (res.ok) onSave()
    onClose()
  }

  if (!form) return null

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Editar Asociado</h3>
        <input type="text" name="nombre" value={form.nombre} onChange={handleChange} placeholder="Nombre" />
        <input type="text" name="apellido" value={form.apellido} onChange={handleChange} placeholder="Apellido" />
        <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email" />
        <input type="text" name="direccion" value={form.direccion} onChange={handleChange} placeholder="Dirección" />
        <select name="categoria" value={form.categoria} onChange={handleChange}>
          <option value="ACTIVO">Activo</option>
          <option value="JUVENIL">Juvenil</option>
        </select>
        <input type="text" name="escuela" value={form.escuela || ''} onChange={handleChange} placeholder="Escuela" />
        <input type="text" name="curso" value={form.curso || ''} onChange={handleChange} placeholder="Curso" />
        <textarea name="comentario" value={form.comentario || ''} onChange={handleChange} placeholder="Comentario" />

        <div className="modal-actions">
          <button onClick={handleSubmit}>Guardar</button>
          <button className="cancelar" onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </div>
  )
}
