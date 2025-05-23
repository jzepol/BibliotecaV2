import Image from 'next/image'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

interface Taller {
  id: number
  titulo: string
  descripcion: string
  fecha: string
  hora: string
  imagenUrl?: string
  facilitador: string
}

export default function HeroTalleres({ talleres = [] }: { talleres: Taller[] }) {
  if (!talleres.length) return null
  return (
    <div className="talleres-hero">
      <h2 className="eventos-titulo">Talleres destacados</h2>
      <div className="eventos-carrusel">
        {talleres.map((taller) => (
          <div key={taller.id} className="evento-card">
            <div className="evento-img-wrapper">
              {taller.imagenUrl ? (
                <Image
                  src={taller.imagenUrl}
                  alt={taller.titulo}
                  width={400}
                  height={250}
                  className="evento-imagen"
                />
              ) : (
                <div className="evento-imagen-placeholder">Imagen pendiente</div>
              )}
            </div>
            <p className="evento-fecha">
              📅 {format(new Date(taller.fecha), "d 'de' MMMM 'de' yyyy", { locale: es })} - 🕒 {taller.hora}
            </p>
            <h3 className="evento-titulo">{taller.titulo}</h3>
            <p className="evento-descripcion">
              {taller.descripcion.length > 90
                ? taller.descripcion.slice(0, 90) + '...'
                : taller.descripcion}
            </p>
            <a href={`/talleres`} className="card-leer-mas">Ver más</a>
          </div>
        ))}
      </div>
      <a href="/talleres" className="evento-button">Ver todos los talleres</a>
    </div>
  )
} 