'use client'

import { useState } from 'react'
import '@/styles/AsociadoForm.css'

interface AsociadoFormData {
  email: string
  apellido: string
  nombre: string
  dni: number
  telefono: bigint | null
  fechaNacimiento: string
  direccion: string
  categoria: string
  escuela?: string
  curso?: string
  comentario?: string
}

export default function AsociadoForm() {
  const [formData, setFormData] = useState<AsociadoFormData>({
    email: '',
    apellido: '',
    nombre: '',
    dni: 0,
    telefono: null,
    fechaNacimiento: '',
    direccion: '',
    categoria: 'ACTIVO',
    escuela: '',
    curso: '',
    comentario: ''
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validaciones básicas
    if (!formData.email.includes('@') || !formData.email.includes('.')) {
      alert('Por favor, ingresá un correo electrónico válido.')
      return
    }

    if (formData.dni.toString().length < 7) {
      alert('DNI inválido. Debe contener al menos 7 números.')
      return
    }

    if (!formData.fechaNacimiento) {
      alert('Por favor, ingresá tu fecha de nacimiento.')
      return
    }

    if (formData.categoria === 'JUVENIL') {
      if (!formData.escuela?.trim() || !formData.curso?.trim()) {
        alert('Si sos juvenil, tenés que completar Escuela y Curso.')
        return
      }
    }

    try {
      const res = await fetch('/api/asociados', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!res.ok) {
        throw new Error('Error al enviar el formulario')
      }

      alert('Formulario enviado correctamente ✅')

      setFormData({
        email: '',
        apellido: '',
        nombre: '',
        dni: 0,
        telefono: null,
        fechaNacimiento: '',
        direccion: '',
        categoria: 'ACTIVO',
        escuela: '',
        curso: '',
        comentario: ''
      })
    } catch (error) {
      console.error('Error:', error)
      alert('Error al enviar el formulario ❌')
    }
  }

  return (
    <div
      className="asociado-form-container"
      style={{ backgroundImage: 'url("/img/Fondolineasok.webp")' }}
    >
      <form onSubmit={handleSubmit} className="asociado-form-box">
        <h2>Formulario de Asociación</h2>

        <FormField label="Correo electrónico" name="email" type="email" value={formData.email} onChange={handleChange} required />
        <FormField label="Apellido" name="apellido" value={formData.apellido} onChange={handleChange} required />
        <FormField label="Nombre" name="nombre" value={formData.nombre} onChange={handleChange} required />
        <FormField label="DNI" name="dni" type="number" value={formData.dni.toString()} onChange={(e) => setFormData({ ...formData, dni: Number(e.target.value) })} required />
        <FormField 
          label="Teléfono" 
          name="telefono" 
          type="number" 
          value={formData.telefono?.toString() || ''} 
          onChange={(e) => {
            const value = e.target.value;
            setFormData({ 
              ...formData, 
              telefono: value ? BigInt(value) : null 
            });
          }} 
        />
        <FormField label="Fecha de nacimiento" name="fechaNacimiento" type="date" value={formData.fechaNacimiento} onChange={handleChange} required />
        <FormField label="Dirección" name="direccion" value={formData.direccion} onChange={handleChange} required />

        <div className="asociado-form-field">
          <label htmlFor="categoria">Categoría</label>
          <select
            name="categoria"
            id="categoria"
            value={formData.categoria}
            onChange={handleChange}
          >
            <option value="ACTIVO">Activo</option>
            <option value="JUVENIL">Juvenil</option>
            <option value="CONTRIBUYENTE">Contribuyente</option>
          </select>
        </div>

        {formData.categoria === 'JUVENIL' && (
          <>
            <FormField label="Escuela" name="escuela" value={formData.escuela || ''} onChange={handleChange} required />
            <FormField label="Curso" name="curso" value={formData.curso || ''} onChange={handleChange} required />
          </>
        )}

        <div className="asociado-form-field">
          <label htmlFor="comentario">Comentario</label>
          <textarea
            name="comentario"
            id="comentario"
            rows={3}
            value={formData.comentario || ''}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="asociado-form-submit">
          Enviar formulario
        </button>
      </form>
    </div>
  )
}

function FormField({
  label,
  name,
  value,
  onChange,
  type = 'text',
  required = false,
}: {
  label: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void
  type?: string
  required?: boolean
}) {
  return (
    <div className="asociado-form-field">
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        name={name}
        id={name}
        required={required}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}

