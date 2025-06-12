'use client'

import { useEffect, useState } from 'react'
import '@/styles/components/AsociadosGrid.css'
import PagosModal from './PagosModal'
import DetallesModal from './DetalleModal'

interface Asociado {
  id: number
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
  fechaInscripcion: string
}

export default function AsociadosGrid() {
  const [asociados, setAsociados] = useState<Asociado[]>([])
  const [filtro, setFiltro] = useState('')
  const [paginaActual, setPaginaActual] = useState(0)
  const elementosPorPagina = 10

  const [asociadoParaPagos, setAsociadoParaPagos] = useState<Asociado | null>(null)
  const [asociadoSeleccionado, setAsociadoSeleccionado] = useState<Asociado | null>(null)

  useEffect(() => {
    fetch('/api/asociados/all')
      .then(res => res.json())
      .then(data => setAsociados(data))
  }, [])

  const filtrados = asociados.filter(a => {
    const busqueda = filtro.toLowerCase()
    return (
      `${a.apellido} ${a.nombre}`.toLowerCase().includes(busqueda) ||
      a.dni.toString().includes(busqueda) ||
      a.telefono?.toString().includes(busqueda)
    )
  })

  const totalPaginas = Math.ceil(filtrados.length / elementosPorPagina)

  const eliminarAsociado = async (id: number) => {
    const confirmar = confirm('¿Estás seguro de que quieres eliminar a este asociado?')
    if (!confirmar) return

    try {
      const res = await fetch(`/api/asociados/${id}`, {
        method: 'DELETE',
      })

      if (res.ok) {
        alert('Asociado eliminado correctamente ✅')
        fetch('/api/asociados/all') // Recargar la lista de asociados
          .then(res => res.json())
          .then(data => setAsociados(data))
      } else {
        const data = await res.json()
        alert(data.error || 'Error al eliminar el asociado ❌')
      }
    } catch (error) {
      console.error('Error al conectar con el servidor:', error)
      alert('Error al conectar con el servidor ❌')
    }
  }

  const cargarAsociados = () => {
    fetch('/api/asociados/all')
      .then(res => res.json())
      .then(data => setAsociados(data))
  }

  return (
    
    <div className="grid-asociados">
      <h2>Asociados</h2>
      <div className="asociados-header">
  <a href="/asociarse" className="btn-agregar-socixs">➕ Agregar socixs</a>
  
</div>

      <input
        type="text"
        placeholder="Buscar por nombre, DNI o teléfono"
        value={filtro}
        onChange={e => {
          setFiltro(e.target.value)
          setPaginaActual(0)
        }}
      />

      <table>
        <thead>
          <tr>
            <th>Apellido</th>
            <th>Nombre</th>
            <th>DNI</th>
            <th>Categoria</th>
            <th>Comentario</th>
            <th>Acciones</th>
            
          </tr>
        </thead>
        <tbody>
          {filtrados
            .slice(paginaActual * elementosPorPagina, (paginaActual + 1) * elementosPorPagina)
            .map((a) => (
              <tr key={a.id}>
                <td>{a.apellido}</td>
                <td>{a.nombre}</td>
                <td>{a.dni}</td>
                <td>{a.categoria}</td>
                <td>{a.comentario}</td>
                <td>
                  <button className="btn-accion pagos" onClick={() => setAsociadoParaPagos(a)}>Pagos💰</button>
                  <button className="btn-accion detalles" onClick={() => setAsociadoSeleccionado(a)}>Ver Detalles👁️</button>
                  <button className="btn-accion eliminar" onClick={() => eliminarAsociado(a.id)}>Eliminar🗑️</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <div className="paginacion">
        <button onClick={() => setPaginaActual(prev => Math.max(prev - 1, 0))} disabled={paginaActual === 0}>← Anterior</button>
        <span>Página {paginaActual + 1} de {totalPaginas}</span>
        <button onClick={() => setPaginaActual(prev => Math.min(prev + 1, totalPaginas - 1))} disabled={paginaActual >= totalPaginas - 1}>Siguiente →</button>
      </div>

      {asociadoSeleccionado && (
        <DetallesModal
          asociado={asociadoSeleccionado}
          onClose={() => setAsociadoSeleccionado(null)}
          onSave={() => {
            cargarAsociados();
            setAsociadoSeleccionado(null);
          }}
        />
      )}

      {asociadoParaPagos && (
        <PagosModal
          asociadoId={asociadoParaPagos.id}
          nombre={asociadoParaPagos.nombre}
          apellido={asociadoParaPagos.apellido}
          onClose={() => setAsociadoParaPagos(null)}
        />
      )}
    </div>
  )
}
