import Image from 'next/image'

export default function HeroContent() {
  return (
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
  )
} 