// app/dashboard/prestamos/page.tsx
'use client'

import PrestamosGrid from '@/components/dashboard/PrestamosGrid'
import Link from 'next/link'
import '@/styles/Dashboard.css'

export default function PrestamosPage() {
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
      <PrestamosGrid />
    </main>
  )
}
