import Image from 'next/image'
export const dynamic = 'force-dynamic'
import { obtenerTalleres } from '@/services/talleres'
import './Talleres.css'

export default async function TalleresPage() {
  const talleres = await obtenerTalleres()

  return (
    <div className="talleres-container">
      <h1 className="talleres-titulo">Talleres</h1>
      <div className="talleres-grid">
        {talleres.map((taller) => (
          <div key={taller.id} className="taller-card">
            {taller.imagenUrl ? (
              <Image src={taller.imagenUrl} alt={taller.titulo} className="taller-imagen" width={400} height={250} />
            ) : (
              <div className="taller-imagen-placeholder">Imagen no disponible</div>
            )}
            <div className="taller-info">
              <h2>{taller.titulo}</h2>
              <p className="taller-fecha-hora">
                📅 {new Date(taller.fecha).toLocaleDateString()} - 🕒 {taller.hora}
              </p>
              <p className="taller-facilitador">Facilitador: {taller.facilitador}</p>
              <details>
                <summary>Ver más</summary>
                <p className="taller-descripcion">{taller.descripcion}</p>
              </details>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
