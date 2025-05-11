/* 'use client'

import { Noticia } from '@prisma/client'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import '@/styles/NoticiaCard.css'
import { useState } from 'react'
import Image from 'next/image'

export default function NoticiaCard({ noticia }: { noticia: Noticia }) {
  const [mostrarModal, setMostrarModal] = useState(false)

  return (
    <>
      <div className="noticia-card" onClick={() => setMostrarModal(true)}>
        {noticia.imagenUrl && (
          <Image
            src={noticia.imagenUrl}
            alt={noticia.titulo}
            width={500}
            height={300}
            className="noticia-img"
          />
        )}
        <div className="noticia-body">
          <p className="noticia-fecha">
            {format(new Date(noticia.fecha), "d 'de' MMMM 'de' yyyy", { locale: es })}
          </p>
          <h3 className="noticia-titulo">{noticia.titulo}</h3>
          <p className="noticia-descripcion">
            {noticia.contenido.length > 100 ? noticia.contenido.slice(0, 100) + '...' : noticia.contenido}
          </p>
          <span className="noticia-leer-mas">Leer más</span>
        </div>
      </div>

      {mostrarModal && (
        <div className="modal-overlay" onClick={() => setMostrarModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-cerrar" onClick={() => setMostrarModal(false)}>
              ✕
            </button>
            {noticia.imagenUrl && (
              <Image
                src={noticia.imagenUrl}
                alt={noticia.titulo}
                width={900}
                height={500}
                className="modal-img"
              />
            )}
            <h2>{noticia.titulo}</h2>
            <p className="noticia-fecha">
              {format(new Date(noticia.fecha), "d 'de' MMMM 'de' yyyy", { locale: es })}
            </p>
            <p className="modal-texto">{noticia.contenido}</p>
          </div>
        </div>
      )}
    </>
  )
}
 */
'use client'

import { Noticia } from '@prisma/client'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import Image from 'next/image'
import { useState } from 'react'
import '@/styles/NoticiaCard.css'

export default function NoticiaCard({ noticia }: { noticia: Noticia }) {
  const [mostrarModal, setMostrarModal] = useState(false)

  return (
    <>
      <div className="noticia-card" onClick={() => setMostrarModal(true)}>
        {noticia.imagenUrl ? (
          <div className="noticia-img-wrapper">
            <Image
              src={noticia.imagenUrl}
              alt={noticia.titulo}
              width={800}
              height={400}
              className="noticia-img"
            />
          </div>
        ) : (
          <div className="noticia-img-placeholder">Imagen pendiente</div>
        )}

        <div className="noticia-info">
          <p className="noticia-fecha">
            {format(new Date(noticia.fecha), "d 'de' MMMM 'del' yyyy", { locale: es })}
          </p>
          <h3 className="noticia-titulo">{noticia.titulo}</h3>
          <p className="noticia-descripcion">
            {noticia.contenido.length > 100
              ? noticia.contenido.slice(0, 100) + '...'
              : noticia.contenido}
          </p>
          <span className="noticia-leer-mas">Leer más</span>
        </div>
      </div>

      {mostrarModal && (
        <div className="modal-overlay" onClick={() => setMostrarModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-cerrar" onClick={() => setMostrarModal(false)}>
              ✕
            </button>

            {noticia.imagenUrl && (
              <Image
                src={noticia.imagenUrl}
                alt={noticia.titulo}
                width={900}
                height={500}
                className="modal-img"
              />
            )}

            <h2>{noticia.titulo}</h2>
            <p className="noticia-fecha">
              {format(new Date(noticia.fecha), "d 'de' MMMM 'del' yyyy", { locale: es })}
            </p>
            <p className="modal-texto">{noticia.contenido}</p>
          </div>
        </div>
      )}
    </>
  )
}
