import { Evento } from '@prisma/client'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import Image from 'next/image'
import '@/styles/EventosCard.css'

export default function EventoCard({ evento }: { evento: Evento }) {
  return (
    <div className="evento-card">
      {evento.imagenUrl ? (
        <div className="evento-img-wrapper">
          <Image
  src={evento.imagenUrl}
  alt={evento.titulo}
  width={800}
  height={400}
  className="evento-img"
/>
          <span className={`evento-estado ${evento.estado.toLowerCase()}`}>
            {evento.estado === 'PROXIMAMENTE' && 'Próximamente'}
            {evento.estado === 'EN_CURSO' && 'En curso'}
            {evento.estado === 'FINALIZADO' && 'Finalizado'}
          </span>
        </div>
      ) : (
        <div className="evento-img-placeholder">
          Imagen pendiente
          <span className={`evento-estado ${evento.estado.toLowerCase()}`}>
            {evento.estado === 'PROXIMAMENTE' && 'Próximamente'}
            {evento.estado === 'EN_CURSO' && 'En curso'}
            {evento.estado === 'FINALIZADO' && 'Finalizado'}
          </span>
        </div>
      )}

      <div className="evento-info">
        <p className="evento-fecha">
          {format(new Date(evento.fecha), "d 'de' MMMM 'del' yyyy", { locale: es })}
        </p>
        <h3 className="evento-titulo">{evento.titulo}</h3>
        <p className="evento-descripcion">
          {evento.descripcion.length > 100
            ? evento.descripcion.slice(0, 100) + '...'
            : evento.descripcion}
        </p>
      </div>
    </div>
  )
}
