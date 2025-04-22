import { Evento } from '@prisma/client'
import Image from 'next/image'
import '@/styles/components/ItemGrid.css'

interface EventosGridProps {
  eventos?: Evento[]
  onEdit: (evento: Evento) => void
  onDelete: (id: number) => void
}

export default function EventosGrid({ eventos = [], onEdit, onDelete }: EventosGridProps) {
  return (
    <div className="grid-container">
      {eventos.map((evento) => (
        <div key={evento.id} className={`card evento-${evento.estado.toLowerCase()}`}>
          {evento.imagenUrl ? (
            <Image
              src={evento.imagenUrl}
              alt={evento.titulo}
              width={500}
              height={300}
              style={{ objectFit: 'cover', width: '100%', height: 'auto' }}
            />
          ) : (
            <div className="placeholder-img">Imagen pendiente</div>
          )}
          <h3>{evento.titulo}</h3>
          <p>{evento.descripcion}</p>
          <p className="fecha-evento">
            {new Date(evento.fecha).toLocaleDateString('es-AR', {
              day: '2-digit',
              month: 'long',
              year: 'numeric',
            })}
          </p>
          <span className="estado">{evento.estado.replace('_', ' ')}</span>
          <div className="card-actions">
            <button
              onClick={() =>
                onEdit({
                  ...evento,
                  fecha:
                    typeof evento.fecha === 'string'
                      ? evento.fecha
                      : evento.fecha.toISOString(), // 👈 aseguramos que sea string
                })
              }
            >
              Editar
            </button>
            <button onClick={() => onDelete(evento.id)}>Eliminar</button>
          </div>
        </div>
      ))}
    </div>
  )
}
