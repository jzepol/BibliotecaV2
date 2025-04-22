'use client'

import Image from 'next/image'
import '../infantil/Infantil.css'

export default function InfantilPage() {
  return (
    <div className="biblioteca-container">
      <h1>Rincón Infantil</h1>
      <Image
        src="/img/rincon-infantil.webp" 
        alt="Espacio infantil de la biblioteca"
        width={900}
        height={500}
        style={{ width: '100%', borderRadius: '12px', marginBottom: '2rem' }}
      />
      <p>
        El Rincón Infantil de la Biblioteca Antonio Esteban Agüero es un espacio especialmente diseñado para que los más pequeños disfruten de la lectura, el juego y la imaginación. Aquí encuentran libros ilustrados, cuentos clásicos y contemporáneos, así como actividades pensadas para despertar su curiosidad y creatividad.
      </p>

      <h2>¿Qué ofrece este espacio?</h2>
      <ul>
        <li>Libros accesibles y adaptados a diferentes edades</li>
        <li>Mobiliario colorido y cómodo</li>
        <li>Talleres aptos para todas las edades</li>
        <li>Un entorno seguro y estimulante</li>
      </ul>

      <p>
        Este rincón es parte fundamental de nuestra misión de formar pequeños lectores felices, promoviendo desde temprana edad el amor por los libros y el descubrimiento del mundo a través de las palabras.
      </p>

      <p>
        ¡Te invitamos a visitarnos con tus hijxs, nietxs o estudiantes y ser parte de esta experiencia!
      </p>
    </div>
  )
}
