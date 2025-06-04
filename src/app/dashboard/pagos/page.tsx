'use client';

import React from 'react';
import Link from 'next/link';
import PagosAsociadosGrid from '@/components/pagos/PagosAsociadosGrid';
import '@/styles/Dashboard.css';

export default function PagosPage() {
  return (
    <main className="dashboard-catalogo">
      <div className="dashboard-navigation">
        <Link href="/dashboard" className="dashboard-tab-button">Novedades</Link>
        <Link href="/dashboard" className="dashboard-tab-button">Eventos</Link>
        <Link href="/dashboard" className="dashboard-tab-button">Talleres</Link>
        <Link href="/dashboard/asociados" className="dashboard-tab-button">Socixs</Link>
        <Link href="/dashboard/catalogo" className="dashboard-tab-button">Catálogo</Link>
        <Link href="/dashboard/prestamos" className="dashboard-tab-button">Prestamo</Link>
        <Link href="/dashboard/pagos" className="dashboard-tab-button">Pagos</Link>
      </div>
      <PagosAsociadosGrid />
    </main>
  );
} 