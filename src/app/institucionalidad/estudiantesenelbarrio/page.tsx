import './EstudiantesEnElBarrio.css';
import Image from 'next/image';

export default function EstudiantesEnElBarrio() {
  return (
    <div className="biblioteca-container">
      <div className="portada-container">
        <Image
          src="/img/estudiantesenelbarrio/estudiantesenelbarrioportada.jpeg"
          alt="Estudiantes en el Barrio - Portada"
          width={900}
          height={400}
          className="portada-image"
          priority
        />
      </div>

      <h1>Estudiantes en el Barrio</h1>
      
      <p>
        Estudiantes en el Barrio es una organización social independiente de partidos políticos, 
        conformada por estudiantes de distintos centros educativos como la Universidad Nacional de San Luis, 
        el Instituto de Formación Docente Continua y la Universidad Nacional de Villa Mercedes, entre otros.
      </p>

      <p>
        Realizamos actividades en distintos barrios Villa Mercedes y San Luis, donde trabajamos con 
        referentes barriales para garantizar actividades buscando un cambio en realidades que nos resultan injustas.
      </p>

      <div className="image-container">
        <Image
          src="/img/estudiantesenelbarrio/fondo1.webp"
          alt="Actividades de Estudiantes en el Barrio"
          width={800}
          height={400}
          className="content-image"
        />
      </div>

      <h2>Nuestra Actividad Principal</h2>
      <p>
        Nuestra actividad principal es alfabetización, la cual está enmarcada dentro del programa Raíces, 
        institucionalizado por la UNSL. El objetivo principal es enseñar a leer y escribir a personas que 
        no hayan tenido acceso a la educación formal, cualquiera sea el motivo.
      </p>

      <h2>Otras Actividades</h2>
      <p>
        Otras actividades que realizamos son roperitos comunitarios, ollas populares, colectas de distintos 
        tipos, rincones de lectura, festejos de las infancias, entre otras.
      </p>

      <div className="image-container">
        <Image
          src="/img/estudiantesenelbarrio/fondo2.webp"
          alt="Actividades comunitarias"
          width={800}
          height={400}
          className="content-image"
        />
      </div>

      <h2>Nuestra Filosofía</h2>
      <p>
        Lo que guía al grupo es la construcción colectiva con les vecines del barrio, la escucha activa de 
        sus demandas y el compromiso con las actividades que se llevan a cabo. Entendiendo que cada persona 
        debe saber leer y escribir, tener un techo y un plato de comida, contar con acceso a la salud, a la 
        recreación y a cada derecho que se vea coartado por las condiciones desiguales de existencia.
      </p>

      <h2>Vínculo con la Biblioteca</h2>
      <p>
        Nuestra vinculación con la Biblioteca Popular Antonio Esteban Agüero nace a partir de encontrar allí 
        un lugar de encuentro y de posibilidad. Esta última referida a la oportunidad de vincular la cultura, 
        particularmente la literatura, con el barrio. Los derechos culturales no llegan a todos los espacios 
        y nos pareció importante crear la forma de que las personas, y sobre todo, les niñes del barrio, 
        pudieran disfrutar de este. Así nacieron los rincones de lectura, espacios donde la literatura 
        creaba un mundo de fantasía para los más pequeños.
      </p>
    </div>
  );
} 