import { Noticia } from '@prisma/client' 
import Image from 'next/image'
import '@/styles/components/NoticiasGrid.css'

interface NoticiasGridProps {
  noticias?: Noticia[]
  onEdit: (noticia: Noticia) => void
  onDelete: (id: number) => void
}

export default function NoticiasGrid({ noticias = [], onEdit, onDelete }: NoticiasGridProps) {
  return (
    <div className="grid-container">
      {noticias.map((noticia) => (
        <div key={noticia.id} className="card">
          {noticia.imagenUrl && (
            <Image
              src={noticia.imagenUrl}
              alt={noticia.titulo}
              width={500}
              height={300}
              className="card-img"
              onClick={() => window.open(noticia.imagenUrl, '_blank')}
            />
          )}
          <h3>{noticia.titulo}</h3>
          <div className="card-actions">
            <button onClick={() => onEdit(noticia)}>Editar</button>
            <button onClick={() => onDelete(noticia.id)}>Eliminar</button>
          </div>
        </div>
      ))}
    </div>
  )
}
