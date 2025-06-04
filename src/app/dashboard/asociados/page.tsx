'use client'

import AsociadosGrid from '@/components/dashboard/AsociadosGrid'
import '@/styles/Dashboard.css'
import Link from 'next/link'

export default function AsociadosPage() {
  return (
    <div className="dashboard-container">
       <div className="dashboard-navigation">
  <Link href="/dashboard" className="dashboard-tab-button">Novedades</Link>
  <Link href="/dashboard" className="dashboard-tab-button">Eventos</Link>
  <Link href="/dashboard" className="dashboard-tab-button">Talleres</Link>
  <Link href="/dashboard/asociados" className="dashboard-tab-button">Socixs</Link>
  <Link href="/dashboard/catalogo" className="dashboard-tab-button">Catálogo</Link>
  <Link href="/dashboard/prestamos" className="dashboard-tab-button">Prestamo</Link>
  <Link href="/dashboard/pagos" className="dashboard-tab-button">Pagos</Link>
    </div>
      <h1 className="dashboard-title">Gestión de Socixs</h1>
      
      <div className="dashboard-form form-fullwidth">

        <AsociadosGrid />

      </div>
    </div>
  )
} 