'use client'

import { useEffect, useState } from 'react'
import { EstadoPago, Mes } from '@prisma/client'
import { obtenerPagosPorAsociado } from '@/services/pagosService'
import EditarPagoPopup from './EditarPagoPopup'
import styles from './PagosAsociadosGrid.module.css'

interface Asociado {
  id: number
  nombre: string
  apellido: string
  dni: number
}

interface Pago {
  id: number
  mes: Mes
  año: number
  estado: EstadoPago
  comprobanteUrl?: string
  comentario?: string
  fechaPago: Date
}

const meses: Mes[] = [
  "ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO",
  "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"
]

export default function PagosAsociadosGrid() {
  const [asociados, setAsociados] = useState<Asociado[]>([])
  const [asociadoSeleccionado, setAsociadoSeleccionado] = useState<Asociado | null>(null)
  const [pagos, setPagos] = useState<Pago[]>([])
  const [año, setAño] = useState(new Date().getFullYear())
  const [filtro, setFiltro] = useState('')
  const [paginaActual, setPaginaActual] = useState(0)
  const [editandoPagos, setEditandoPagos] = useState(false)
  const elementosPorPagina = 10

  useEffect(() => {
    const cargarAsociados = async () => {
      const res = await fetch('/api/asociados/all')
      const data = await res.json()
      setAsociados(data)
    }
    cargarAsociados()
  }, [])

  useEffect(() => {
    if (asociadoSeleccionado) {
      const cargarPagos = async () => {
        try {
          const pagosData = await obtenerPagosPorAsociado(asociadoSeleccionado.id, año)
          setPagos(pagosData)
        } catch (error) {
          console.error('Error al cargar pagos:', error)
        }
      }
      cargarPagos()
    }
  }, [asociadoSeleccionado, año])

  const asociadosFiltrados = asociados.filter(a =>
    `${a.apellido} ${a.nombre}`.toLowerCase().includes(filtro.toLowerCase()) ||
    a.dni.toString().includes(filtro)
  )

  const totalPaginas = Math.ceil(asociadosFiltrados.length / elementosPorPagina)
  const asociadosPaginados = asociadosFiltrados.slice(
    paginaActual * elementosPorPagina,
    (paginaActual + 1) * elementosPorPagina
  )

  const getEstadoPago = (mes: Mes) => {
    const pago = pagos.find(p => p.mes === mes)
    return pago?.estado || 'PENDIENTE'
  }

  const getColorEstado = (estado: EstadoPago) => {
    switch (estado) {
      case 'PAGADO':
        return '#4CAF50'
      case 'IMPAGO':
        return '#f44336'
      default:
        return '#FFA500'
    }
  }

  const handleEditarPagos = (asociado: Asociado) => {
    setAsociadoSeleccionado(asociado)
    setEditandoPagos(true)
  }

  const handleCerrarEdicion = () => {
    setEditandoPagos(false)
    setAsociadoSeleccionado(null)
  }

  const handlePagosGuardados = () => {
    if (asociadoSeleccionado) {
      const cargarPagos = async () => {
        try {
          const pagosData = await obtenerPagosPorAsociado(asociadoSeleccionado.id, año)
          setPagos(pagosData)
        } catch (error) {
          console.error('Error al cargar pagos:', error)
        }
      }
      cargarPagos()
    }
  }

  return (
    <div className={styles.gridContainer}>
      <h2>Gestión de Pagos</h2>

      <div className={styles.filtros}>
        <input
          type="text"
          placeholder="Buscar por nombre, apellido o DNI"
          value={filtro}
          onChange={(e) => {
            setFiltro(e.target.value)
            setPaginaActual(0)
          }}
        />
        <select
          value={año}
          onChange={(e) => setAño(Number(e.target.value))}
        >
          {[año - 1, año, año + 1].map((a) => (
            <option key={a} value={a}>
              {a}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.tablaContainer}>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Apellido</th>
              <th>Nombre</th>
              <th>DNI</th>
              <th>Estado de Pagos</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {asociadosPaginados.map((asociado) => (
              <tr key={asociado.id}>
                <td>{asociado.id}</td>
                <td>{asociado.apellido}</td>
                <td>{asociado.nombre}</td>
                <td>{asociado.dni}</td>
                <td>
                  <div className={styles.estadosPagos}>
                    {meses.map((mes) => (
                      <div
                        key={mes}
                        className={styles.estadoPago}
                        style={{ backgroundColor: getColorEstado(getEstadoPago(mes)) }}
                        title={`${mes}: ${getEstadoPago(mes)}`}
                      />
                    ))}
                  </div>
                </td>
                <td>
                  <button
                    className={styles.btnEditar}
                    onClick={() => handleEditarPagos(asociado)}
                  >
                    Editar Pagos
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles.paginacion}>
        <button
          onClick={() => setPaginaActual((prev) => Math.max(prev - 1, 0))}
          disabled={paginaActual === 0}
        >
          Anterior
        </button>
        <span>
          Página {paginaActual + 1} de {totalPaginas}
        </span>
        <button
          onClick={() => setPaginaActual((prev) => Math.min(prev + 1, totalPaginas - 1))}
          disabled={paginaActual >= totalPaginas - 1}
        >
          Siguiente
        </button>
      </div>

      {editandoPagos && asociadoSeleccionado && (
        <EditarPagoPopup
          asociado={asociadoSeleccionado}
          año={año}
          onClose={handleCerrarEdicion}
          onSuccess={handlePagosGuardados}
        />
      )}
    </div>
  )
} 