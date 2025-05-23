import Image from 'next/image'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

interface Evento {
  id: number
  titulo: string
  descripcion: string
  fecha: string
  estado: string
  imagenUrl?: string
}

export default function HeroEventos({ eventos = [] }: { eventos: Evento[] }) {
  if (!eventos.length) return null
  return (
    <div className="eventos-hero">
      <h2 className="eventos-titulo">Próximamente en la Biblioteca</h2>
      <div className="eventos-carrusel">
        {eventos.map((evento) => (
          <div key={evento.id} className="evento-card">
            <div className="evento-img-wrapper">
              {evento.imagenUrl ? (
                <Image
                  src={evento.imagenUrl}
                  alt={evento.titulo}
                  width={400}
                  height={250}
                  className="evento-imagen"
                />
              ) : (
                <div className="evento-imagen-placeholder">Imagen pendiente</div>
              )}
              <span className={`evento-estado ${evento.estado.toLowerCase()}`}>
                {evento.estado === 'PROXIMAMENTE' && 'Próximamente'}
                {evento.estado === 'EN_CURSO' && 'En curso'}
                {evento.estado === 'FINALIZADO' && 'Finalizado'}
              </span>
            </div>
            <p className="evento-fecha">
              {format(new Date(evento.fecha), "d 'de' MMMM 'de' yyyy", { locale: es })}
            </p>
            <h3 className="evento-titulo">{evento.titulo}</h3>
            <p className="evento-descripcion">
              {evento.descripcion.length > 90
                ? evento.descripcion.slice(0, 90) + '...'
                : evento.descripcion}
            </p>
            <a href="/eventos" className="evento-leer-mas">Ver más</a>
          </div>
        ))}
      </div>
      <a href="/eventos" className="evento-button">Ver todos los eventos</a>
    </div>
  )
} 