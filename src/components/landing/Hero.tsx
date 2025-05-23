'use client'

import '@/styles/Hero.css'
import '@/styles/Hero.module.css'
import useHeroData from '@/hooks/useHeroData'
import HeroContent from './HeroContent'
import HeroEventos from './HeroEventos'
import HeroTalleres from './HeroTalleres'
import OrganizacionesAmigas from '../OrganizacionesAmigas/OrganizacionesAmigas'
import HeroWhatsapp from './HeroWhatsapp'

export default function Hero() {
  const { eventos, talleres, loading } = useHeroData()

  return (
    <section className="hero">
      <div
        className="asociado-form-container"
        style={{ backgroundImage: 'url("/img/Fondolineasok.webp")' }}
      ></div>

      <HeroContent />
      <hr className="hero-separator" />

      {!loading && (
        <>
          <HeroEventos eventos={eventos} />
          <hr className="hero-separator" />
          <HeroTalleres talleres={talleres} />
          <hr className="hero-separator" />
        </>
      )}

      <OrganizacionesAmigas />
      
      <HeroWhatsapp />
    </section>
  )
}
