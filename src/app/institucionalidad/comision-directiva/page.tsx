'use client'

import Image from 'next/image'
import '../comision-directiva/Comision.css'

export default function ComisionPage() {
  return (
    <div className="comision-container">
      <h1>Comisión Directiva</h1>

      <div className="miembro-comision">
        <Image src="/img/comision/lucero.jpeg" alt="Nombre Persona" width={200} height={200} />
        <div className="info-miembro">
          <h2>Directora.</h2>
          <p>Lucero Gomez Cruz.</p>
        </div>
      </div>

      <div className="miembro-comision">
        <Image src="/img/comision/pendiente.webp" alt="Nombre Persona" width={200} height={200} />
        <div className="info-miembro">
          <h2>Secretario Adjunto.</h2>
          <p>Carlos Casco.</p>
        </div>
      </div>

      <div className="miembro-comision">
        <Image src="/img/comision/mariel.jpeg" alt="Nombre Persona" width={200} height={200} />
        <div className="info-miembro">
          <h2>Tesorera.</h2>
          <p>Mariel Korb.</p>
        </div>
      </div>

      <div className="miembro-comision">
        <Image src="/img/comision/jesus.jpeg" alt="Nombre Persona" width={200} height={200} />
        <div className="info-miembro">
          <h2>Revisor de Cuentas.</h2>
          <p>Jesus Caiazzo.</p>
        </div>
      </div>

      <h2 className="voluntarios-titulo">Voluntarixs</h2>
      <div className="voluntarios-grid">
        <div className="voluntario-item">
          <Image src="/img/comision/micateamohermosa.jpeg" alt="Voluntario 1" width={160} height={160} />
          <p className="voluntario-nombre">Micaela Sosa Guman</p>
        </div>
        <div className="voluntario-item">
          <Image src="/img/comision/agustina.jpeg" alt="Voluntario 2" width={160} height={160} />
          <p className="voluntario-nombre">Agustina Alejandra Alcaraz</p>
        </div>
        <div className="voluntario-item">
          <Image src="/img/comision/valentina.jpeg" alt="Voluntario 2" width={160} height={160} />
          <p className="voluntario-nombre">Valentina Canderle</p>
        </div>
        <div className="voluntario-item">
          <Image src="/img/comision/florencia.jpeg" alt="Voluntario 3" width={160} height={160} />
          <p className="voluntario-nombre">Florencia M. A. Huetagoyena</p>
        </div>
        <div className="voluntario-item">
          <Image src="/img/comision/guadalupe.jpeg" alt="Voluntario 4" width={160} height={160} />
          <p className="voluntario-nombre">Guadalupe Miranda</p>
        </div>
        <div className="voluntario-item">
          <Image src="/img/comision/santini.jpeg" alt="Voluntario 4" width={160} height={160} />
          <p className="voluntario-nombre">Juan Ignacio Santini</p>
        </div>
      </div>
    </div>
  )
}
