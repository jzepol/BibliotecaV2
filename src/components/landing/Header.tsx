'use client'

import { useState } from 'react'
import Link from 'next/link'
import '@/styles/Header.css'

export default function Header() {
  const [showDropdown, setShowDropdown] = useState(false)
  const [menuAbierto, setMenuAbierto] = useState(false)

  const toggleMenu = () => setMenuAbierto(!menuAbierto)

  return (
    <header className="header">
      <div className="mobile-toggle" onClick={toggleMenu}>
        ☰
      </div>

      <nav className={`nav ${menuAbierto ? 'open' : ''}`}>
        <div className="nav-left">
          <Link href="/noticias">Novedades</Link>

          <div
            className="dropdown"
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            <Link href="#" className="dropdown-btn">Institucional ▾</Link>
            <div className={`dropdown-menu ${showDropdown ? 'show' : ''}`}>
              <Link href="/institucionalidad/bibliotecas-populares">Bibliotecas Populares</Link>
              {/* <Link href="/institucionalidad/historia">Nuestra Historia</Link> */}
              <Link href="/institucionalidad/infantil">Rincón Infantil</Link>
              <Link href="/institucionalidad/rincon-julia">Rincón Julia R. Biscontini</Link>
              <Link href="/institucionalidad/comision-directiva">Comisión Directiva</Link>
              <Link href="/institucionalidad/horarios">Horarios de Atención</Link>
            </div>
          </div>
          <Link href="/eventos">Eventos</Link>
          <Link href="/talleres">Talleres</Link>
          {/* <Link href="/convocatorias">Convocatorias</Link> */}
        </div>

        <div className="nav-central">
          <Link href="/">Inicio</Link>
        </div>

        <div className="nav-right">
          <Link href="/asociarse">Quiero ser parte</Link>
          <Link href="/login">Iniciar sesión</Link>
        </div>
      </nav>
    </header>
  )
}
