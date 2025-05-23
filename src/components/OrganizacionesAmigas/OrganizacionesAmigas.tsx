'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './OrganizacionesAmigas.module.css';

const organizaciones = [
  {
    id: 1,
    nombre: 'Estudiantes en el Barrio',
    imagen: '/img/organizacionesamigas/estudiantesenelbarrio.webp',
    descripcion: 'Organización social de estudiantes comprometidos con la comunidad'
  },
  {
    id: 2,
    nombre: 'Aquelarre Colectivo',
    imagen: '/img/organizacionesamigas/aquelarrecolectivo.webp',
    descripcion: 'Colectivo cultural y artístico'
  }
];

export default function OrganizacionesAmigas() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === organizaciones.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); 

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === organizaciones.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? organizaciones.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className={styles.carouselContainer}>
      <h2 className={styles.titulo}>Organizaciones Amigas</h2>
      <div className={styles.carousel}>
        <button 
          className={`${styles.carouselButton} ${styles.prevButton}`}
          onClick={prevSlide}
          aria-label="Anterior"
        >
          ←
        </button>
        
        <div className={styles.slideContainer}>
          {organizaciones.map((org, index) => (
            <div
              key={org.id}
              className={`${styles.slide} ${index === currentIndex ? styles.active : ''}`}
            >
              <div className={styles.imageContainer}>
                <Image
                  src={org.imagen}
                  alt={org.nombre}
                  width={360}
                  height={240}
                  className={styles.image}
                />
              </div>
            </div>
          ))}
        </div>

        <button 
          className={`${styles.carouselButton} ${styles.nextButton}`}
          onClick={nextSlide}
          aria-label="Siguiente"
        >
          →
        </button>
      </div>

      <div className={styles.dots}>
        {organizaciones.map((_, index) => (
          <button
            key={index}
            className={`${styles.dot} ${index === currentIndex ? styles.activeDot : ''}`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Ir a slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
} 