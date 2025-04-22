'use client'

import { useState } from 'react'
import '@/styles/AsociadoForm.css'

export default function AsociadoForm() {
  const [form, setForm] = useState({
    email: '',
    apellido: '',
    nombre: '',
    dni: '',
    fechaNacimiento: '',
    direccion: '',
    categoria: 'ACTIVO',
    escuela: '',
    curso: '',
    comentario: '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validaciones básicas
    if (!form.email.includes('@') || !form.email.includes('.')) {
      alert('Por favor, ingresá un correo electrónico válido.')
      return
    }

    if (form.dni.length < 7 || isNaN(Number(form.dni))) {
      alert('DNI inválido. Debe contener al menos 7 números.')
      return
    }

    if (!form.fechaNacimiento) {
      alert('Por favor, ingresá tu fecha de nacimiento.')
      return
    }

    if (form.categoria === 'JUVENIL') {
      if (!form.escuela.trim() || !form.curso.trim()) {
        alert('Si sos juvenil, tenés que completar Escuela y Curso.')
        return
      }
    }

    try {
      await fetch('/api/asociados', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      alert('Formulario enviado correctamente ✅')

      setForm({
        email: '',
        apellido: '',
        nombre: '',
        dni: '',
        fechaNacimiento: '',
        direccion: '',
        categoria: 'ACTIVO',
        escuela: '',
        curso: '',
        comentario: '',
      })
    } catch (error) {
      console.error('Error al enviar:', error)
      alert('Ocurrió un error al enviar el formulario ❌')
    }
  }

  return (
    <div
      className="asociado-form-container"
      style={{ backgroundImage: 'url("/img/Fondolineasok.webp")' }}
    >
      <form onSubmit={handleSubmit} className="asociado-form-box">
        <h2>Formulario de Asociación</h2>

        <FormField label="Correo electrónico" name="email" type="email" value={form.email} onChange={handleChange} required />
        <FormField label="Apellido" name="apellido" value={form.apellido} onChange={handleChange} required />
        <FormField label="Nombre" name="nombre" value={form.nombre} onChange={handleChange} required />
        <FormField label="DNI" name="dni" type="number" value={form.dni} onChange={handleChange} required />
        <FormField label="Fecha de nacimiento" name="fechaNacimiento" type="date" value={form.fechaNacimiento} onChange={handleChange} required />
        <FormField label="Dirección" name="direccion" value={form.direccion} onChange={handleChange} required />

        <div className="asociado-form-field">
          <label htmlFor="categoria">Categoría</label>
          <select
            name="categoria"
            id="categoria"
            value={form.categoria}
            onChange={handleChange}
          >
            <option value="ACTIVO">Activo (Abona)</option>
            <option value="JUVENIL">Juvenil (Menor de 18 - No abona)</option>
          </select>
        </div>

        {form.categoria === 'JUVENIL' && (
          <>
            <FormField label="Escuela" name="escuela" value={form.escuela} onChange={handleChange} required />
            <FormField label="Curso" name="curso" value={form.curso} onChange={handleChange} required />
          </>
        )}

        <div className="asociado-form-field">
          <label htmlFor="comentario">Comentario</label>
          <textarea
            name="comentario"
            id="comentario"
            rows={3}
            value={form.comentario}
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

