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
          <p><strong>Mañana</strong>:<br />Lunes y Martes<br />10:00 a 13:00 hs</p>
          <p><strong>Tarde</strong>:<br />Lunes,Martes, Miércoles, Jueves, Viernes<br />16:00 a 19:00 hs</p>
        </div>
      )}
    </div>
  )
}
