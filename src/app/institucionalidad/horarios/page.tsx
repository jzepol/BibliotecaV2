'use client'

import '@/styles/HorariosPage.css'

export default function HorariosPage() {
  return (
    <div className="horarios-container">
      <h1>Horarios de Atención</h1>

      <div className="horario-bloque">
        <h2>Mañana</h2>
        <p>Lunes y Martes</p>
        <p>10:00 a 13:00 hs</p>
      </div>

      <div className="horario-bloque">
        <h2>Tarde</h2>
        <p>Lunes, Martes, Miércoles, Jueves y Viernes</p>
        <p>17:00 a 20:00 hs</p>
      </div>
    </div>
  )
}
