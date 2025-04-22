import { obtenerEventos } from '@/services/eventos'
import EventoCard from '@/components/eventos/EventosCard'
import '@/styles/EventosCard.css'

export default async function EventosPage() {
  const eventos = await obtenerEventos()

  return (
    <div className="eventos-page">
      <h1 className="titulo-eventos">Conocé nuestros eventos</h1>
      <p className="subtitulo-eventos">Ver todos los eventos.</p>

      <div className="eventos-grid">
        {eventos.length === 0 ? (
          <p>No hay eventos disponibles.</p>
        ) : (
          eventos.map((evento) => <EventoCard key={evento.id} evento={evento} />)
        )}
      </div>
    </div>
  )
}
