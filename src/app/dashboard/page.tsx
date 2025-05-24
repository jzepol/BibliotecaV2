'use client'

import { useEffect, useState } from 'react'
import NoticiaForm from '@/components/forms/NoticiaForm'
import EventoForm from '@/components/forms/EventoForm'
import TallerForm from '@/components/forms/TallerForm'
import dynamic from 'next/dynamic'
import { Noticia, Evento, Taller } from '@prisma/client'
import '@/styles/Dashboard.css'
import TalleresGrid from '@/components/dashboard/TalleresGrid'
import Link from 'next/link'

type NoticiaApi = Omit<Noticia, 'imagenUrl'> & { imagenUrl: string | null }

const NoticiasGrid = dynamic(() => import('@/components/dashboard/NoticiasGrid'), { ssr: false, loading: () => <div>Cargando noticias...</div> })
const EventosGrid = dynamic(() => import('@/components/dashboard/EventosGrid'), { ssr: false, loading: () => <div>Cargando eventos...</div> })

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<'noticias' | 'eventos' | 'talleres'>('noticias')

  const [noticias, setNoticias] = useState<Noticia[]>([])
  const [noticiaEditada, setNoticiaEditada] = useState<Noticia | undefined>()

  const [eventos, setEventos] = useState<Evento[]>([])
  const [eventoEditado, setEventoEditado] = useState<Evento | undefined>()

  const [talleres, setTalleres] = useState<Taller[]>([])
  const [tallerEditado, setTallerEditado] = useState<Taller | undefined>()

  const cargarNoticias = async () => {
    const res = await fetch('/api/noticias/all')
    const data: NoticiaApi[] = await res.json()
    const noticiasTransformadas: Noticia[] = data.map((n) => ({
      id: n.id,
      titulo: n.titulo,
      contenido: n.contenido,
      fecha: new Date(n.fecha),
      imagenUrl: n.imagenUrl ?? '',
    }))
    setNoticias(noticiasTransformadas)
  }

  const cargarEventos = async () => {
    const res = await fetch('/api/eventos/all')
    const data: Evento[] = await res.json()
    const eventosTransformados: Evento[] = data.map((e) => ({
      ...e,
      fecha: new Date(e.fecha),
    }))
    setEventos(eventosTransformados)
  }

  const cargarTalleres = async () => {
    const res = await fetch('/api/talleres/all')
    const data: Taller[] = await res.json()
    setTalleres(data)
  }

  const eliminarNoticia = async (id: number) => {
    const res = await fetch(`/api/noticias/${id}`, { method: 'DELETE' })
    if (res.ok) cargarNoticias()
  }

  const eliminarEvento = async (id: number) => {
    const res = await fetch(`/api/eventos/${id}`, { method: 'DELETE' })
    if (res.ok) cargarEventos()
  }

  const eliminarTaller = async (id: number) => {
    const res = await fetch(`/api/talleres/${id}`, { method: 'DELETE' })
    if (res.ok) cargarTalleres()
  }

  useEffect(() => {
    if (activeTab === 'noticias') cargarNoticias()
    if (activeTab === 'eventos') cargarEventos()
    if (activeTab === 'talleres') cargarTalleres()
  }, [activeTab])

  const handleEditarEvento = (evento: Evento) => {
    setEventoEditado({
      ...evento,
      fecha: new Date(evento.fecha), // aseguro que sea tipo Date
    })
  }

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Panel de administración</h1>

      <div className="dashboard-tabs">
        <button className={`dashboard-tab-button ${activeTab === 'noticias' ? 'active' : ''}`} onClick={() => setActiveTab('noticias')}>Novedades</button>
        <button className={`dashboard-tab-button ${activeTab === 'eventos' ? 'active' : ''}`} onClick={() => setActiveTab('eventos')}>Eventos</button>
        <button className={`dashboard-tab-button ${activeTab === 'talleres' ? 'active' : ''}`} onClick={() => setActiveTab('talleres')}>Talleres</button>
                <Link href="/dashboard/asociados" className="dashboard-tab-button">Socixs</Link>
        <Link href="/dashboard/catalogo" className="dashboard-tab-button">Catálogo</Link>
        <Link href="/dashboard/prestamos" className="dashboard-tab-button">Prestamo</Link>
      </div>

      <div className="dashboard-form">
        {activeTab === 'noticias' ? (
          <>
            <NoticiaForm noticiaEditada={noticiaEditada} onNoticiaGuardada={cargarNoticias} />
            <NoticiasGrid noticias={noticias} onEdit={setNoticiaEditada} onDelete={eliminarNoticia} />
          </>
        ) : activeTab === 'eventos' ? (
          <>
           <EventoForm
              eventoEditado={
                eventoEditado
                  ? {
                      ...eventoEditado,
                      fecha: eventoEditado.fecha.toISOString().split('T')[0], // convierte a YYYY-MM-DD
                    }
                  : undefined
              }
              onEventoGuardado={cargarEventos}
            />
            <EventosGrid eventos={eventos} onEdit={handleEditarEvento} onDelete={eliminarEvento} />
          </>
        ) : (
          <>
            <TallerForm
              tallerEditado={
                tallerEditado
                  ? {
                      ...tallerEditado,
                      fecha: tallerEditado.fecha.toISOString().split('T')[0], 
                    }
                  : undefined
              }
              onTallerGuardado={cargarTalleres}
            />
            <TalleresGrid talleres={talleres} onEdit={setTallerEditado} onDelete={eliminarTaller} />
          </>
        )}
      </div>
    </div>
  )
}
