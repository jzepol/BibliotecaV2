'use client'

import AsociadosGrid from '@/components/dashboard/AsociadosGrid'
import '@/styles/Dashboard.css'

export default function AsociadosPage() {
  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Gestión de Asociados</h1>
      <div className="dashboard-form form-fullwidth">
        <AsociadosGrid />
      </div>
    </div>
  )
} 