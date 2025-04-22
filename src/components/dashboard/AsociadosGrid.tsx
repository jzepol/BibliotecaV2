'use client'

import { useEffect, useState } from 'react'
import '@/styles/components/AsociadosGrid.css'
import ExcelJS from 'exceljs'
import { saveAs } from 'file-saver'

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
  fechaInscripcion: string
}

export default function AsociadosGrid() {
  const [asociados, setAsociados] = useState<Asociado[]>([])
  const [filtro, setFiltro] = useState('')
  const [asociadoEditando, setAsociadoEditando] = useState<Asociado | null>(null)

  useEffect(() => {
    const cargarAsociados = async () => {
      const res = await fetch('/api/asociados/all')
      const data = await res.json()
      setAsociados(data)
    }

    cargarAsociados()
  }, [])

  const filtrados = asociados.filter((a) =>
    `${a.apellido} ${a.nombre}`.toLowerCase().includes(filtro.toLowerCase()) ||
    a.dni.toString().includes(filtro)
  )

  const exportarCSV = () => {
    const encabezado = ['Apellido','Nombre','DNI','Email','Inscripto el','Categoría','Escuela','Curso']
    const filas = filtrados.map(a => [
      `"${a.apellido}"`,
      `"${a.nombre}"`,
      a.dni,
      a.email,
      new Date(a.fechaInscripcion).toLocaleDateString(),
      a.categoria,
      a.escuela || '',
      a.curso || ''
    ])
    const csv = [encabezado, ...filas].map(row => row.join(',')).join('\n')

    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'asociados.csv'
    link.click()
    URL.revokeObjectURL(url)
  }

  const exportarExcel = async () => {
    const workbook = new ExcelJS.Workbook()
    const worksheet = workbook.addWorksheet('Asociados')

    worksheet.columns = [
      { header: 'Apellido', key: 'apellido' },
      { header: 'Nombre', key: 'nombre' },
      { header: 'DNI', key: 'dni' },
      { header: 'Email', key: 'email' },
      { header: 'Inscripto el', key: 'fechaInscripcion' },
      { header: 'Categoría', key: 'categoria' },
      { header: 'Escuela', key: 'escuela' },
      { header: 'Curso', key: 'curso' },
    ]

    filtrados.forEach((a) => {
      worksheet.addRow({
        apellido: a.apellido,
        nombre: a.nombre,
        dni: a.dni,
        email: a.email,
        fechaInscripcion: new Date(a.fechaInscripcion).toLocaleDateString(),
        categoria: a.categoria,
        escuela: a.escuela || '',
        curso: a.curso || '',
      })
    })

    const buffer = await workbook.xlsx.writeBuffer()
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
    saveAs(blob, 'asociados.xlsx')
  }

  const eliminarAsociado = async (id: number) => {
    const confirmar = confirm('¿Estás seguro de que deseas eliminar este asociado?')
    if (!confirmar) return

    const res = await fetch(`/api/asociados/${id}`, { method: 'DELETE' })
    if (res.ok) {
      setAsociados(prev => prev.filter(a => a.id !== id))
    } else {
      alert('Error al eliminar asociado')
    }
  }

  const actualizarAsociado = async () => {
    if (!asociadoEditando) return

    const res = await fetch(`/api/asociados/${asociadoEditando.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(asociadoEditando),
    })

    if (res.ok) {
      const actualizado = await res.json()
      setAsociados(prev =>
        prev.map(a => (a.id === actualizado.id ? actualizado : a))
      )
      setAsociadoEditando(null)
    } else {
      alert('Error al actualizar el asociado')
    }
  }

  return (
    <div className="grid-asociados">
      <h2>Listado de Asociados</h2>

      <input
        type="text"
        placeholder="Filtrar por nombre o DNI..."
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
      />
      <div className="export-buttons">
        <button onClick={exportarCSV}>Exportar CSV</button>
        <button onClick={exportarExcel}>Exportar Excel</button>
      </div>

      <div className="tabla-scroll">
        <table>
          <thead>
            <tr>
              <th>Apellido</th>
              <th>Nombre</th>
              <th>DNI</th>
              <th>Email</th>
              <th>Inscripto el</th>
              <th>Categoría</th>
              <th>Escuela</th>
              <th>Curso</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filtrados.map((a) => (
              <tr key={a.id}>
                <td>{a.apellido}</td>
                <td>{a.nombre}</td>
                <td>{a.dni}</td>
                <td>{a.email}</td>
                <td>{new Date(a.fechaInscripcion).toLocaleDateString()}</td>
                <td>{a.categoria}</td>
                <td>{a.escuela || '-'}</td>
                <td>{a.curso || '-'}</td>
                <td>
                  <button className="btn-accion editar" onClick={() => setAsociadoEditando(a)}>✏️</button>
                  <button className="btn-accion eliminar" onClick={() => eliminarAsociado(a.id)}>🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {asociadoEditando && (
        <div className="modal-overlay" onClick={() => setAsociadoEditando(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3 className='modalh3'>Editar Asociado</h3>
            <input value={asociadoEditando.apellido} onChange={e => setAsociadoEditando({ ...asociadoEditando, apellido: e.target.value })} />
            <input value={asociadoEditando.nombre} onChange={e => setAsociadoEditando({ ...asociadoEditando, nombre: e.target.value })} />
            <input value={asociadoEditando.email} onChange={e => setAsociadoEditando({ ...asociadoEditando, email: e.target.value })} />
            <input value={asociadoEditando.direccion} onChange={e => setAsociadoEditando({ ...asociadoEditando, direccion: e.target.value })} />
            {/* Otros campos si querés editarlos también */}
            <button onClick={actualizarAsociado}>Guardar</button>
            <button onClick={() => setAsociadoEditando(null)}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  )
}
