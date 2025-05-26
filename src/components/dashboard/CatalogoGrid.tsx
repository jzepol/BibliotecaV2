'use client'

import { useEffect, useState } from 'react'
import '@/styles/components/CatalogoGrid.css'
import LibrosForm from '@/components/forms/LibrosForm'

interface Libro {
  id: number
  ISBN?: string
  autor?: string
  titulo: string
  subtitulo?: string
  edicion?: string
  lugar?: string
  editorial?: string
  fechaPublicacion?: string
  extension?: string
  caracteristicas?: string
  volumen?: string
  materia?: string
  ubicacion?: string
  bibliotecario?: string
  cutter?: string
  st?: number
}

export default function CatalogoGrid() {
  const [libros, setLibros] = useState<Libro[]>([])
  const [filtro, setFiltro] = useState('')
  const [paginaActual, setPaginaActual] = useState(0)
  const [libroEditando, setLibroEditando] = useState<Libro | null>(null)
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const elementosPorPagina = 10

  const cargarLibros = async () => {
    const res = await fetch('/api/catalogo')
    const data = await res.json()
    setLibros(data)
  }

  useEffect(() => {
    cargarLibros()
  }, [])

  const filtrados = libros.filter((l) =>
    l.titulo.toLowerCase().includes(filtro.toLowerCase()) ||
    l.autor?.toLowerCase().includes(filtro.toLowerCase()) ||
    l.ISBN?.includes(filtro)
  )

  const totalPaginas = Math.ceil(filtrados.length / elementosPorPagina)
  const librosPaginados = filtrados.slice(
    paginaActual * elementosPorPagina,
    (paginaActual + 1) * elementosPorPagina
  )

  const eliminarLibro = async (id: number) => {
    const confirmar = confirm('¿Eliminar este libro del catálogo?')
    if (!confirmar) return
    const res = await fetch(`/api/catalogo/${id}`, { method: 'DELETE' })
    if (res.ok) setLibros(prev => prev.filter(l => l.id !== id))
  }

  const actualizarLibro = async () => {
    if (!libroEditando) return
    const res = await fetch(`/api/catalogo/${libroEditando.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(libroEditando),
    })
    if (res.ok) {
      const actualizado = await res.json()
      setLibros(prev => prev.map(l => l.id === actualizado.id ? actualizado : l))
      setLibroEditando(null)
    }
  }

  return (
    <div className="catalogo-grid">
      <h2>Catálogo de Libros</h2>

      <button onClick={() => setMostrarFormulario(true)} className="btn-accion crear">
        ➕ Catalogar libro
      </button>

      <input
        type="text"
        placeholder="Buscar por título, autor o ISBN"
        value={filtro}
        onChange={(e) => {
          setFiltro(e.target.value)
          setPaginaActual(0)
        }}
      />

      <div className="tabla-scroll">
        <table>
          <thead>
            <tr>
              <th>St</th>
              <th>ISBN</th>
              <th>Título</th>
              <th>Subtítulo</th>
              <th>Autor</th>
              <th>Edición</th>
              <th>Lugar</th>
              <th>Editorial</th>
              <th>Fecha Publicación</th>
              <th>Extensión</th>
              <th>Características</th>
              <th>Volumen</th>
              <th>Materia</th>
              <th>Bibliotecario</th>
              <th>Cutter</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {librosPaginados.map((l) => (
              <tr key={l.id}>
                <td>{l.st}</td>
                <td>{l.ISBN || '-'}</td>
                <td>{l.titulo}</td>
                <td>{l.subtitulo || '-'}</td>
                <td>{l.autor || '-'}</td>
                <td>{l.edicion || '-'}</td>
                <td>{l.lugar || '-'}</td>
                <td>{l.editorial || '-'}</td>
                <td>{l.fechaPublicacion || '-'}</td>
                <td>{l.extension || '-'}</td>
                <td>{l.caracteristicas || '-'}</td>
                <td>{l.volumen || '-'}</td>
                <td>{l.materia || '-'}</td>
                <td>{l.bibliotecario || '-'}</td>
                <td>{l.cutter || '-'}</td>
                <td>
                  <button className="btn-accion editar" onClick={() => setLibroEditando(l)}>✏️</button>
                  <button className="btn-accion eliminar" onClick={() => eliminarLibro(l.id)}>🗑️</button>
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

      {libroEditando && (
        <div className="modal-overlay" onClick={() => setLibroEditando(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Editar Libro</h3>
                          <input
                type="number"
                value={libroEditando.st?.toString() || ''}
                onChange={e =>
                  setLibroEditando({
                    ...libroEditando,
                    st: Number(e.target.value) || 0
                  })
                }
                placeholder="Código ubicación en estantería"
                required
              />
            <input value={libroEditando.titulo} onChange={e => setLibroEditando({ ...libroEditando, titulo: e.target.value })} placeholder="Título" required />
            <input value={libroEditando.autor || ''} onChange={e => setLibroEditando({ ...libroEditando, autor: e.target.value })} placeholder="Autor" />
            <input value={libroEditando.ISBN || ''} onChange={e => setLibroEditando({ ...libroEditando, ISBN: e.target.value })} placeholder="ISBN" />
            <input value={libroEditando.subtitulo || ''} onChange={e => setLibroEditando({ ...libroEditando, subtitulo: e.target.value })} placeholder="Subtítulo" />
            <input value={libroEditando.edicion || ''} onChange={e => setLibroEditando({ ...libroEditando, edicion: e.target.value })} placeholder="Edición" />
            <input value={libroEditando.lugar || ''} onChange={e => setLibroEditando({ ...libroEditando, lugar: e.target.value })} placeholder="Lugar" />
            <input value={libroEditando.editorial || ''} onChange={e => setLibroEditando({ ...libroEditando, editorial: e.target.value })} placeholder="Editorial" />
            <input value={libroEditando.fechaPublicacion || ''} onChange={e => setLibroEditando({ ...libroEditando, fechaPublicacion: e.target.value })} placeholder="Fecha de publicación" />
            <input value={libroEditando.extension || ''} onChange={e => setLibroEditando({ ...libroEditando, extension: e.target.value })} placeholder="Extensión" />
            <input value={libroEditando.caracteristicas || ''} onChange={e => setLibroEditando({ ...libroEditando, caracteristicas: e.target.value })} placeholder="Características" />
            <input value={libroEditando.volumen || ''} onChange={e => setLibroEditando({ ...libroEditando, volumen: e.target.value })} placeholder="Volumen" />
            <input value={libroEditando.materia || ''} onChange={e => setLibroEditando({ ...libroEditando, materia: e.target.value })} placeholder="Materia" />
            <input value={libroEditando.bibliotecario || ''} onChange={e => setLibroEditando({ ...libroEditando, bibliotecario: e.target.value })} placeholder="Bibliotecario a cargo" />
            <input value={libroEditando.cutter || ''} onChange={e => setLibroEditando({ ...libroEditando, cutter: e.target.value })} placeholder="Cutter" />
            <button onClick={actualizarLibro}>Guardar</button>
            <button onClick={() => setLibroEditando(null)}>Cancelar</button>
          </div>
        </div>
      )}

      {mostrarFormulario && (
        <LibrosForm onSuccess={cargarLibros} onClose={() => setMostrarFormulario(false)} />
      )}
    </div>
  )
}
