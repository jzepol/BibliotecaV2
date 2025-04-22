'use client'

import { useEffect, useState } from 'react'
import NoticiaForm from '@/components/forms/NoticiaForm'
import EventoForm from '@/components/forms/EventoForm'
import TallerForm from '@/components/forms/TallerForm'
import NoticiasGrid from '@/components/dashboard/NoticiasGrid'
import EventosGrid from '@/components/dashboard/EventosGrid'
import TalleresGrid from '@/components/dashboard/TalleresGrid'
import AsociadosGrid from '@/components/dashboard/AsociadosGrid'
import { Noticia, Evento, Taller } from '@prisma/client'
import '@/styles/Dashboard.css'

type NoticiaApi = Omit<Noticia, 'imagenUrl'> & { imagenUrl: string | null }

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<'noticias' | 'eventos' | 'talleres' | 'asociados'>('noticias')

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
    setEventos(data)
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

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Panel de administración</h1>

      <div className="dashboard-tabs">
        <button className={`dashboard-tab-button ${activeTab === 'noticias' ? 'active' : ''}`} onClick={() => setActiveTab('noticias')}>Novedades</button>
        <button className={`dashboard-tab-button ${activeTab === 'eventos' ? 'active' : ''}`} onClick={() => setActiveTab('eventos')}>Eventos</button>
        <button className={`dashboard-tab-button ${activeTab === 'talleres' ? 'active' : ''}`} onClick={() => setActiveTab('talleres')}>Talleres</button>
        <button className={`dashboard-tab-button ${activeTab === 'asociados' ? 'active' : ''}`} onClick={() => setActiveTab('asociados')}>Asociados</button>
      </div>

      <div className={`dashboard-form ${activeTab === 'asociados' ? 'form-fullwidth' : ''}`}>
        {activeTab === 'noticias' ? (
          <>
            <NoticiaForm noticiaEditada={noticiaEditada} onNoticiaGuardada={cargarNoticias} />
            <NoticiasGrid noticias={noticias} onEdit={setNoticiaEditada} onDelete={eliminarNoticia} />
          </>
        ) : activeTab === 'eventos' ? (
          <>
            <EventoForm eventoEditado={eventoEditado} onEventoGuardado={cargarEventos} />
            <EventosGrid eventos={eventos} onEdit={setEventoEditado} onDelete={eliminarEvento} />
          </>
        ) : activeTab === 'talleres' ? (
          <>
            <TallerForm tallerEditado={tallerEditado} onTallerGuardado={cargarTalleres} />
            <TalleresGrid talleres={talleres} onEdit={setTallerEditado} onDelete={eliminarTaller} />
          </>
        ) : (
          <AsociadosGrid />
        )}
      </div>
    </div>
  )
}
