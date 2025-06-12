'use client'

import { useEffect, useState } from 'react'
import PrestamosForm from '@/components/forms/PrestamosForm'
import '@/styles/components/PrestamosGrid.css'

interface Prestamo {
  id: number
  estado: 'ACTIVO' | 'DEVUELTO' | 'VENCIDO'
  fechaInicio: string
  fechaFin: string
  asociado: {
    id: number
    nombre: string
    apellido: string
  }
  libro: {
    id: number
    titulo: string
    autor?: string
    ISBN?: string
  }
}

export default function PrestamosGrid() {
  const [prestamos, setPrestamos] = useState<Prestamo[]>([])
  const [filtro, setFiltro] = useState('')
  const [paginaActual, setPaginaActual] = useState(0)
  const elementosPorPagina = 10

  const cargarPrestamos = async () => {
    const res = await fetch('/api/prestamos')
    const data = await res.json()
    setPrestamos(data)
  }

  useEffect(() => {
    cargarPrestamos()
  }, [])

  const filtrados = prestamos.filter((p) => {
    const nombreCompleto = `${p.asociado.apellido} ${p.asociado.nombre}`.toLowerCase()
    const tituloLibro = p.libro.titulo.toLowerCase()
    return (
      nombreCompleto.includes(filtro.toLowerCase()) ||
      tituloLibro.includes(filtro.toLowerCase())
    )
  })

  const totalPaginas = Math.ceil(filtrados.length / elementosPorPagina)
  const prestamosPaginados = filtrados.slice(
    paginaActual * elementosPorPagina,
    (paginaActual + 1) * elementosPorPagina
  )

  const devolverPrestamo = async (id: number) => {
    const confirmar = confirm('¿Confirmar la devolución de este préstamo?')
    if (!confirmar) return

    try {
      const res = await fetch(`/api/prestamos/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          estado: 'DEVUELTO'
        })
      })

      if (res.ok) {
        alert('Préstamo devuelto correctamente ✅')
        cargarPrestamos()
      } else {
        const data = await res.json()
        alert(data.error || 'Error al devolver el préstamo ❌')
      }
    } catch (error) {
      console.error('Error al devolver el préstamo:', error)
      alert('Error al conectar con el servidor')
    }
  }

  return (
    <div className="grid-asociados">
      <h2>Gestión de Préstamos</h2>

      <PrestamosForm onSuccess={cargarPrestamos} />

      <div className="dashboard-navigation">
        <h2>Devolución</h2>
        <input
          type="text"
          placeholder="Buscar por asociado o libro"
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
              <th>ISBN</th>
              <th>Asociado</th>
              <th>Libro</th>
              <th>Estado</th>
              <th>Inicio</th>
              <th>Fin</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {prestamosPaginados.map((p) => {
              const fechaFin = new Date(p.fechaFin)
              const vencido = p.estado === 'ACTIVO' && fechaFin < new Date()
              return (
                <tr key={p.id} className={vencido ? 'vencido' : ''}>
                  <td>{p.libro.ISBN}</td>
                  <td>{p.asociado.apellido}, {p.asociado.nombre}</td>
                  <td>{p.libro.titulo}{p.libro.autor ? ` (${p.libro.autor})` : ''}</td>
                  <td>{vencido ? 'VENCIDO' : p.estado}</td>
                  <td>{new Date(p.fechaInicio).toLocaleDateString()}</td>
                  <td>{new Date(p.fechaFin).toLocaleDateString()}</td>
                  <td>
                    {p.estado === 'ACTIVO' && (
                      <button
                        className="btn-accion devolver"
                        onClick={() => devolverPrestamo(p.id)}
                      >
                        Devolver
                      </button>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div className="paginacion">
        <button
          onClick={() => setPaginaActual((prev) => Math.max(prev - 1, 0))}
          disabled={paginaActual === 0}
        >
          ← Anterior
        </button>
        <span>Página {paginaActual + 1} de {totalPaginas}</span>
        <button
          onClick={() => setPaginaActual((prev) => Math.min(prev + 1, totalPaginas - 1))}
          disabled={paginaActual >= totalPaginas - 1}
        >
          Siguiente →
        </button>
      </div>
    </div>
  )
}