'use client'

import CatalogoGrid from '@/components/dashboard/CatalogoGrid'
import Link from 'next/link'

export default function CatalogoPage() {
  return (
    <main className="dashboard-catalogo">
       <div className="dashboard-navigation">
  <Link href="/dashboard" className="dashboard-tab-button">Novedades</Link>
  <Link href="/dashboard" className="dashboard-tab-button">Eventos</Link>
  <Link href="/dashboard" className="dashboard-tab-button">Talleres</Link>
  <Link href="/dashboard/asociados" className="dashboard-tab-button">Socixs</Link>
  <Link href="/dashboard/catalogo" className="dashboard-tab-button">Catálogo</Link>
  <Link href="/dashboard/prestamos" className="dashboard-tab-button">Prestamo</Link>
    </div>
      <h1>Gestión del Catálogo de Libros</h1>
      <CatalogoGrid />
    </main>
  )
}
