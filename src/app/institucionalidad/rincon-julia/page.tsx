import '../rincon-julia/Rincon-Julia.css'
import Image from 'next/image'

export default function RinconJuliaPage() {
  return (
    <div className="rincon-julia-container">
      <h1>Rincón Julia Ruiz Biscontini</h1>
      <h2>Rincon de lectura, memoria y perspectiva de genero</h2>

      <Image
        src="/img/rincon-julia.webp"
        alt="Homenaje a Julia R. Biscontini"
        width={900}
        height={500}
        priority
      />

      <p>
        En este rincón de la biblioteca rendimos homenaje a <strong>Julia Ruiz Biscontini</strong>,
        una mujer que con su entrega, amor por la lectura y compromiso social dejó una huella imborrable
        en nuestra comunidad.
      </p>

      <div className="rincon-julia-cita">
  Yo creo que al pasado hay que tomarlo, no olvidarlo, exigir justicia, pero trabajar el pasado en función del futuro.&apos; – Julia
</div>




      <p>
        Julia no solo fue una gran promotora de los derechos humanos y de las mujeres, sino también un pilar fundamental en la construcción
        de esta Biblioteca Popular. Su energía vital aún habita entre libros, cuentos y la sonrisa de quienes
        se acercan a este espacio de encuentro.
      </p>

      <p>
        Hoy, este rincón invita a la reflexión, la memoria, el juego y la ternura. Porque recordar es también un
        acto de amor, y en cada actividad que aquí sucede, Julia sigue acompañándonos.
      </p>
      <h2>&quot;Mujer del año&quot; en Villa Mercedes, San Luis, 2014.</h2>

      <Image
        src="/img/julia-reconocimiento.webp"
        alt="Homenaje a Julia R. Biscontini"
        width={900}
        height={500}
        priority
      />
      <p><strong>Julia</strong> fue Presidente de la Asamblea Permanente de los Derechos Humanos y recibió el reconocimiento 
        a las mujeres de parte de la Cámara de Comercio. Presidenta del foro de estudios sociales de Villa Mercedes y miembro 
        de la Comisión para la Memoria de la Mansión Seré y querellante de las causas ESMA y Mansión Seré. 
         Miembro Directivo de la Biblioteca Antonio Esteban Agüero y abuela cuenta cuentos.</p>
         <div className="rincon-julia-fuente">
          Fuente:{' '}
           <a
            href="https://reportesanluis.com.ar/villa-mercedes-julia-ruiz-biscontini-fue-distinguida-como-mujer-del-ano/"
            target="_blank"
            rel="noopener noreferrer"
             >
            https://reportesanluis.com.ar/villa-mercedes-julia-ruiz-biscontini-fue-distinguida-como-mujer-del-ano/
             </a>
          </div>
    </div>
  )
}
