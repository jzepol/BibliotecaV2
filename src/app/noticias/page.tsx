/* export const dynamic = 'force-dynamic'

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
 */
export const dynamic = 'force-dynamic'
import { obtenerNoticias } from '@/services/noticias'
import NoticiaCard from '@/components/noticias/NoticiaCard'
import '@/styles/NoticiasPage.css'

export default async function NoticiasPage() {
  const noticias = await obtenerNoticias()

  return (
    <div className="noticias-page">
      <h1 className="titulo-noticias">Novedades</h1>
      <p className="subtitulo-noticias">Últimas noticias de la Biblioteca</p>

      <div className="noticias-grid">
        {noticias.map((noticia) => (
          <NoticiaCard key={noticia.id} noticia={noticia} />
        ))}
      </div>
    </div>
  )
}
