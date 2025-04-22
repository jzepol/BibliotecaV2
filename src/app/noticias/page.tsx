import { obtenerNoticias } from '@/services/noticias'
import NoticiaCard from '@/components/noticias/NoticiaCard'

export default async function NoticiasPage() {
  const noticias = await obtenerNoticias()

  return (
    <div className="noticias-grid">
    {noticias.map((noticia) => (
      <NoticiaCard key={noticia.id} noticia={noticia} />
    ))}
  </div>
  
  )
}
