'use client'

import { useState } from 'react'
import '@/styles/HorarioDesplegable.css'

export default function HorarioDesplegable() {
  const [visible, setVisible] = useState(false)

  return (
    <div className="horario-container">
      <button
        className="horario-toggle"
        onClick={() => setVisible(!visible)}
      >
        {Array.from("Horarios").map((l, i) => (
          <span key={i}>{l}</span>
        ))}
      </button>
      {visible && (
        <div className="horario-panel">
          <h3>📚 Horarios de Atención</h3>
          <p><strong>Mañana</strong>:<br />Lunes, Martes, Jueves<br />10:00 a 12:30 hs</p>
          <p><strong>Tarde</strong>:<br />Lunes, Martes, Miércoles, Jueves<br />17:00 a 19:30 hs</p>
        </div>
      )}
    </div>
  )
}
