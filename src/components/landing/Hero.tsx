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

export default function Hero() {
  const [eventos, setEventos] = useState<Evento[]>([])

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
    <p className="evento-fecha">
      {format(new Date(evento.fecha), "d 'de' MMMM 'de' yyyy", { locale: es })}
    </p>
    <h3 className="evento-titulo">{evento.titulo}</h3>
    <p className="evento-descripcion">
      {evento.descripcion.length > 90
        ? evento.descripcion.slice(0, 90) + '...'
        : evento.descripcion}
    </p>
  </div>
))}

          </div>
          <a
            href="https://wa.me/5492657500785"
  className="whatsapp-float"
  target="_blank"
  rel="noopener noreferrer"
>
  <FaWhatsapp size={28} />
</a>

          <a href="/eventos" className="evento-button">Ver todos los eventos</a>
        </div>
        
      )}
    </section>
  )
}
