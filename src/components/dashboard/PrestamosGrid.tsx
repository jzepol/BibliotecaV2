'use client'

import { useEffect, useState } from 'react'
import '@/styles/components/PrestamosGrid.css'
import PrestamosForm from '@/components/forms/PrestamosForm'

interface Prestamo {
  id: number
  fechaInicio: string
  fechaFin?: string
  estado: 'ACTIVO' | 'DEVUELTO' | 'VENCIDO'
  asociado: {
    id: number
    nombre: string
    apellido: string
  }
  libro: {
    id: number
    titulo: string
    autor: string | null
  }
}

export default function PrestamosGrid() {
  const [prestamos, setPrestamos] = useState<Prestamo[]>([])
  const [paginaActual, setPaginaActual] = useState(0)
  const [filtro, setFiltro] = useState('')
  const elementosPorPagina = 10

  const cargarPrestamos = async () => {
    const res = await fetch('/api/prestamos')
    const data = await res.json()
    setPrestamos(data)
  }

  useEffect(() => {
    cargarPrestamos()
  }, [])

  const estaVencido = (fechaInicio: string, estado: string): boolean => {
    if (estado !== 'ACTIVO') return false
    const inicio = new Date(fechaInicio)
    const hoy = new Date()
    const dias = (hoy.getTime() - inicio.getTime()) / (1000 * 60 * 60 * 24)
    return dias > 30
  }

  const marcarDevuelto = async (id: number) => {
    const res = await fetch(`/api/prestamos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ estado: 'DEVUELTO', fechaFin: new Date().toISOString() })
    })
    if (res.ok) cargarPrestamos()
  }

  const prestamosFiltrados = prestamos.filter(p => {
    const nombreCompleto = `${p.asociado.apellido} ${p.asociado.nombre}`.toLowerCase()
    const titulo = p.libro.titulo.toLowerCase()
    return (
      nombreCompleto.includes(filtro.toLowerCase()) ||
      titulo.includes(filtro.toLowerCase())
    )
  })

  const totalPaginas = Math.ceil(prestamosFiltrados.length / elementosPorPagina)
  const prestamosPaginados = prestamosFiltrados.slice(
    paginaActual * elementosPorPagina,
    (paginaActual + 1) * elementosPorPagina
  )

  return (
    <div className="prestamos-grid">
      <h2>Gestión de Préstamos</h2>

      <PrestamosForm onSuccess={cargarPrestamos} />

      <div className="busqueda-wrapper">
        <input
          type="text"
          placeholder="🔍 Buscar por asociado o libro..."
          value={filtro}
          onChange={(e) => {
            setFiltro(e.target.value)
            setPaginaActual(0)
          }}
        />
      </div>

      <div className="tabla-scroll">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Asociado</th>
              <th>Libro</th>
              <th>Estado</th>
              <th>Fecha Inicio</th>
              <th>Fecha Fin</th>
              <th>Alerta</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {prestamosPaginados.map((p) => (
              <tr key={p.id} className={estaVencido(p.fechaInicio, p.estado) ? 'vencido' : ''}>
                <td>{p.id}</td>
                <td>{p.asociado.apellido}, {p.asociado.nombre}</td>
                <td>{p.libro.titulo} {p.libro.autor ? `(${p.libro.autor})` : ''}</td>
                <td>{p.estado}</td>
                <td>{new Date(p.fechaInicio).toLocaleDateString()}</td>
                <td>{p.fechaFin ? new Date(p.fechaFin).toLocaleDateString() : '-'}</td>
                <td>{estaVencido(p.fechaInicio, p.estado) ? '⚠️ Vencido' : ''}</td>
                <td>
                  {p.estado === 'ACTIVO' && (
                    <button className="btn-accion editar" onClick={() => marcarDevuelto(p.id)}>✔️ Devolver</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="paginacion">
        <button onClick={() => setPaginaActual(prev => Math.max(prev - 1, 0))} disabled={paginaActual === 0}>
          ← Anterior
        </button>
        <span>Página {paginaActual + 1} de {totalPaginas}</span>
        <button onClick={() => setPaginaActual(prev => Math.min(prev + 1, totalPaginas - 1))} disabled={paginaActual >= totalPaginas - 1}>
          Siguiente →
        </button>
      </div>
    </div>
  )
}
