'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import '@/styles/Hero.css'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { FaWhatsapp } from 'react-icons/fa'

interface Evento {
  id: number
  titulo: string
  descripcion: string
  fecha: string
  estado: string
  imagenUrl?: string
}

interface Taller {
  id: number
  titulo: string
  descripcion: string
  fecha: string
  hora: string
  imagenUrl?: string
  facilitador: string
}

export default function Hero() {
  const [eventos, setEventos] = useState<Evento[]>([])
  const [talleres, setTalleres] = useState<Taller[]>([])

  useEffect(() => {
    const cargarEventos = async () => {
      try {
        const res = await fetch('/api/eventos/proximos')
        if (!res.ok) throw new Error('Respuesta no válida del servidor')
        const data = await res.json()
        setEventos(data)
      } catch (error) {
        console.error('Error cargando eventos en Hero:', error)
      }
    }

    cargarEventos()
  }, [])

  useEffect(() => {
    const cargarTalleres = async () => {
      try {
        const res = await fetch('/api/talleres/all')
        if (!res.ok) throw new Error('Respuesta no válida del servidor')
        const data = await res.json()
        setTalleres(data)
      } catch (error) {
        console.error('Error cargando talleres en Hero:', error)
      }
    }

    cargarTalleres()
  }, [])

  return (
    <section className="hero">
      <div
        className="asociado-form-container"
        style={{ backgroundImage: 'url("/img/Fondolineasok.webp")' }}
      ></div>

      <div className="hero-content">
        <Image
          src="/logo.png"
          alt="Logo Biblioteca"
          width={250}
          height={250}
          className="hero-logo"
          priority
        />
        <h1 className="titulo-institucional">Biblioteca Antonio Esteban Agüero</h1>
        <p>
          30 años promoviendo la lectura, el encuentro y la autogestión cultural
          en Villa Mercedes, San Luis.
        </p>
        <a href="/asociarse" className="hero-button">¡Quiero asociarme!</a>
      </div>

      {eventos.length > 0 && (
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
      )}

      {talleres.length > 0 && (
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
      )}

      <a
        href="https://wa.me/5492657500785"
        className="whatsapp-float"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaWhatsapp size={28} />
      </a>
    </section>
  )
}
