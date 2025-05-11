import '@/styles/main.css'
import Header from '@/components/landing/Header'
import Footer from '@/components/landing/Footer'
import HorarioDesplegable from '@/components/horarios/HorarioDesplegable'

import { ReactNode } from 'react'

export const metadata = {
  title: 'Biblioteca Popular Antonio Esteban Agüero',
  description:
    'Sitio oficial de la Biblioteca Popular Antonio Esteban Agüero, ubicada en Villa Mercedes, San Luis. Promoviendo la lectura, la cultura y la autogestión desde hace más de 30 años.',
  keywords: [
    'Biblioteca Villa Mercedes',
    'Antonio Esteban Agüero',
    'biblioteca popular',
    'eventos culturales Villa Mercedes',
    'lectura autogestiva',
    'biblioteca pública',
    'cultura San Luis'
  ],
  authors: [{ name: 'Biblioteca Popular Antonio Esteban Agüero' }],
  creator: 'Biblioteca Esteban Agüero',
  generator: 'Next.js',
  openGraph: {
    title: 'Biblioteca Popular Antonio Esteban Agüero',
    description:
      'Promoviendo la lectura y la cultura en Villa Mercedes, San Luis. Conocé nuestros talleres, eventos, convocatorias y más.',
    url: 'https://biblioaguero.com.ar',
    siteName: 'Biblioteca Esteban Agüero',
    locale: 'es_AR',
    type: 'website',
    images: [
      {
        url: 'https://biblioaguero.com.ar/logo.png', 
        width: 800,
        height: 600,
        alt: 'Logo Biblioteca Esteban Agüero',
      }
    ]
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
  },
  icons: {
    icon: '/favicon.ico',
  }
}


export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body className="layout-body">
        <Header />
        <main className="layout-main">{children}</main>
        <HorarioDesplegable />
        <Footer />
      </body>
    </html>
  )
}
