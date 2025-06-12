'use client'

import { useState } from 'react'
import '@/styles/components/DetalleModal.css'

interface DetallesModalProps {
  asociado: {
    id: number
    nombre: string
    apellido: string
    dni: number
    telefono: bigint | null
    email: string
    direccion: string
    fechaNacimiento: string
    fechaInscripcion: string
    categoria: string
    escuela?: string
    curso?: string
    comentario?: string
  }
  onClose: () => void
}

export default function DetallesModal({ asociado, onClose }: DetallesModalProps) {
  const [datos, setDatos] = useState({ ...asociado })

  const handleChange = (campo: keyof typeof datos, valor: string) => {
    setDatos(prev => ({
      ...prev,
      [campo]:
        campo === 'telefono' ? BigInt(valor) :
        campo === 'dni' ? parseInt(valor) :
        valor
    }))
  }

  const handleGuardar = async () => {
    const res = await fetch(`/api/asociados/${datos.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos)
    })

    if (res.ok) {
      alert('✅ Datos actualizados correctamente')
      onClose()
    } else {
      alert('❌ Error al actualizar datos')
    }
  }

  return (
    <div className="detalle-modal-overlay" onClick={onClose}>
      <div className="detalle-modal" onClick={(e) => e.stopPropagation()}>
        <h3 className="detalle-modalh3">Detalles del Asociado</h3>

        <div className="campo">
          <label>Nombre:</label>
          <input value={datos.nombre} onChange={e => handleChange('nombre', e.target.value)} />
        </div>

        <div className="campo">
          <label>Apellido:</label>
          <input value={datos.apellido} onChange={e => handleChange('apellido', e.target.value)} />
        </div>

        <div className="campo">
          <label>DNI:</label>
          <input type="number" value={datos.dni} onChange={e => handleChange('dni', e.target.value)} />
        </div>

        <div className="campo">
          <label>Email:</label>
          <input type="email" value={datos.email} onChange={e => handleChange('email', e.target.value)} />
        </div>

        <div className="campo">
          <label>Teléfono:</label>
          <input value={datos.telefono?.toString() || ''} onChange={e => handleChange('telefono', e.target.value)} />
        </div>

        <div className="campo">
          <label>Dirección:</label>
          <input value={datos.direccion} onChange={e => handleChange('direccion', e.target.value)} />
        </div>

        <div className="campo">
          <label>Fecha de Nacimiento:</label>
          <input type="date" value={datos.fechaNacimiento.split('T')[0]} onChange={e => handleChange('fechaNacimiento', e.target.value)} />
        </div>

        <div className="campo">
          <label>Fecha de Inscripción:</label>
          <input type="date" value={datos.fechaInscripcion.split('T')[0]} onChange={e => handleChange('fechaInscripcion', e.target.value)} />
        </div>

        <div className="campo">
          <label>Categoría:</label>
          <select value={datos.categoria} onChange={e => handleChange('categoria', e.target.value)}>
            <option value="ACTIVO">Activo</option>
            <option value="JUVENIL">Juvenil</option>
            <option value="CONTRIBUYENTE">Contribuyente</option>
            <option value="DE_BAJA">De baja</option>
          </select>
        </div>

        {datos.categoria === 'JUVENIL' && (
          <>
            <div className="campo">
              <label>Escuela:</label>
              <input value={datos.escuela || ''} onChange={e => handleChange('escuela', e.target.value)} />
            </div>
            <div className="campo">
              <label>Curso:</label>
              <input value={datos.curso || ''} onChange={e => handleChange('curso', e.target.value)} />
            </div>
          </>
        )}

        <div className="campo">
          <label>Comentario:</label>
          <textarea value={datos.comentario || ''} onChange={e => handleChange('comentario', e.target.value)} />
        </div>

        <div className="detalle-botones">
          <button className="detalle-guardar" onClick={handleGuardar}>Guardar</button>
          <button className="detalle-cancelar" onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </div>
  )
}
