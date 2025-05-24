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
    a.dni.toString().includes(filtro) ||
    (a.telefono ? a.telefono.toString().includes(filtro) : false)
  )

  const exportarCSV = () => {
    const encabezado = ['Apellido','Nombre','DNI','Teléfono','Email','Dirección','Fecha Nacimiento','Inscripto el','Categoría','Escuela','Curso','Comentario']
    const filas = filtrados.map(a => [
      `"${a.apellido}"`,
      `"${a.nombre}"`,
      a.dni,
      a.telefono ? a.telefono.toString() : '',
      a.email,
      `"${a.direccion}"`,
      new Date(a.fechaNacimiento).toLocaleDateString(),
      new Date(a.fechaInscripcion).toLocaleDateString(),
      a.categoria,
      a.escuela || '',
      a.curso || '',
      a.comentario || ''
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
      { header: 'Teléfono', key: 'telefono' },
      { header: 'Email', key: 'email' },
      { header: 'Dirección', key: 'direccion' },
      { header: 'Fecha Nacimiento', key: 'fechaNacimiento' },
      { header: 'Categoría', key: 'categoria' },
      { header: 'Escuela', key: 'escuela' },
      { header: 'Curso', key: 'curso' },
      { header: 'Comentario', key: 'comentario' }
    ]

    // Agregar validaciones
    worksheet.getColumn('dni').eachCell((cell) => {
      cell.numFmt = '0';
    });

    worksheet.getColumn('telefono').eachCell((cell) => {
      cell.numFmt = '0';
    });

    worksheet.getColumn('fechaNacimiento').eachCell((cell) => {
      cell.numFmt = 'dd/mm/yyyy';
    });

    // Agregar lista desplegable para categoría
    const categoriaValidation = {
      type: 'list' as const,
      allowBlank: true,
      formulae: ['"ACTIVO,JUVENIL,CONTRIBUYENTE"']
    };
    worksheet.getColumn('categoria').eachCell((cell) => {
      cell.dataValidation = categoriaValidation;
    });

    // Agregar instrucciones en la primera fila
    worksheet.insertRow(1, ['INSTRUCCIONES DE IMPORTACIÓN']);
    worksheet.mergeCells('A1:K1');
    worksheet.getCell('A1').font = { bold: true, color: { argb: 'FF0000' } };
    worksheet.getCell('A1').alignment = { horizontal: 'center' };

    // Agregar descripción de campos
    const descripcionCampos = [
      'Apellido: Texto obligatorio',
      'Nombre: Texto obligatorio',
      'DNI: Número obligatorio (sin puntos)',
      'Teléfono: Número (sin puntos ni espacios)',
      'Email: Correo electrónico válido',
      'Dirección: Texto obligatorio',
      'Fecha Nacimiento: Fecha en formato dd/mm/yyyy',
      'Categoría: Seleccionar entre ACTIVO, JUVENIL o CONTRIBUYENTE',
      'Escuela: Texto (obligatorio solo si es JUVENIL)',
      'Curso: Texto (obligatorio solo si es JUVENIL)',
      'Comentario: Texto opcional'
    ];

    worksheet.insertRow(2, descripcionCampos);
    worksheet.getRow(2).font = { italic: true };
    worksheet.getRow(2).height = 40;

    // Ajustar el ancho de las columnas
    worksheet.columns.forEach(column => {
      column.width = 20;
    });

    const buffer = await workbook.xlsx.writeBuffer()
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
    saveAs(blob, 'plantilla_importacion_asociados.xlsx')
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
              <th>Teléfono</th>
              <th>Email</th>
              <th>Dirección</th>
              <th>Fecha Nacimiento</th>
              <th>Inscripto el</th>
              <th>Categoría</th>
              <th>Escuela</th>
              <th>Curso</th>
              <th>Comentario</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filtrados.map((a) => (
              <tr key={a.id}>
                <td>{a.apellido}</td>
                <td>{a.nombre}</td>
                <td>{a.dni}</td>
                <td>{a.telefono ? a.telefono.toString() : '-'}</td>
                <td>{a.email}</td>
                <td>{a.direccion}</td>
                <td>{new Date(a.fechaNacimiento).toLocaleDateString()}</td>
                <td>{new Date(a.fechaInscripcion).toLocaleDateString()}</td>
                <td>{a.categoria}</td>
                <td>{a.escuela || '-'}</td>
                <td>{a.curso || '-'}</td>
                <td>{a.comentario || '-'}</td>
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
            <input value={asociadoEditando.apellido} onChange={e => setAsociadoEditando({ ...asociadoEditando, apellido: e.target.value })} placeholder="Apellido" />
            <input value={asociadoEditando.nombre} onChange={e => setAsociadoEditando({ ...asociadoEditando, nombre: e.target.value })} placeholder="Nombre" />
            <input value={asociadoEditando.dni} onChange={e => setAsociadoEditando({ ...asociadoEditando, dni: Number(e.target.value) })} placeholder="DNI" type="number" />
            <input 
              value={asociadoEditando.telefono?.toString() || ''} 
              onChange={e => {
                const value = e.target.value;
                setAsociadoEditando({ 
                  ...asociadoEditando, 
                  telefono: value ? BigInt(value) : null 
                });
              }} 
              placeholder="Teléfono" 
              type="number" 
            />
            <input value={asociadoEditando.email} onChange={e => setAsociadoEditando({ ...asociadoEditando, email: e.target.value })} placeholder="Email" type="email" />
            <input value={asociadoEditando.direccion} onChange={e => setAsociadoEditando({ ...asociadoEditando, direccion: e.target.value })} placeholder="Dirección" />
            <input value={new Date(asociadoEditando.fechaNacimiento).toISOString().split('T')[0]} onChange={e => setAsociadoEditando({ ...asociadoEditando, fechaNacimiento: e.target.value })} type="date" />
            <select value={asociadoEditando.categoria} onChange={e => setAsociadoEditando({ ...asociadoEditando, categoria: e.target.value })}>
              <option value="ACTIVO">Activo</option>
              <option value="JUVENIL">Juvenil</option>
              <option value="CONTRIBUYENTE">Contribuyente</option>
            </select>
            {asociadoEditando.categoria === 'JUVENIL' && (
              <>
                <input value={asociadoEditando.escuela || ''} onChange={e => setAsociadoEditando({ ...asociadoEditando, escuela: e.target.value })} placeholder="Escuela" />
                <input value={asociadoEditando.curso || ''} onChange={e => setAsociadoEditando({ ...asociadoEditando, curso: e.target.value })} placeholder="Curso" />
              </>
            )}
            <textarea value={asociadoEditando.comentario || ''} onChange={e => setAsociadoEditando({ ...asociadoEditando, comentario: e.target.value })} placeholder="Comentario" />
            <button onClick={actualizarAsociado}>Guardar</button>
            <button onClick={() => setAsociadoEditando(null)}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  )
}
