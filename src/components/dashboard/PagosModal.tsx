'use client'

import { useEffect, useState } from 'react'
import '@/styles/components/PagosModal.css'

type MesEnum =
  | 'ENERO' | 'FEBRERO' | 'MARZO' | 'ABRIL' | 'MAYO' | 'JUNIO'
  | 'JULIO' | 'AGOSTO' | 'SEPTIEMBRE' | 'OCTUBRE' | 'NOVIEMBRE' | 'DICIEMBRE'

type EstadoPago = 'PENDIENTE' | 'PAGADO' | 'IMPAGO'

interface Pago {
  id?: number
  mes: MesEnum
  año: number
  estado: EstadoPago
  comentario?: string
  comprobanteUrl?: string
}

export default function PagosModal({
  asociadoId,
  nombre,
  apellido,
  onClose
}: {
  asociadoId: number
  nombre: string
  apellido: string
  onClose: () => void
}) {
  const [pagos, setPagos] = useState<Pago[]>([])
  const [pagosEditados, setPagosEditados] = useState<Record<MesEnum, Pago>>({} as Record<MesEnum, Pago>)

  const mesesEnum: MesEnum[] = [
    'ENERO','FEBRERO','MARZO','ABRIL','MAYO','JUNIO',
    'JULIO','AGOSTO','SEPTIEMBRE','OCTUBRE','NOVIEMBRE','DICIEMBRE'
  ]

  useEffect(() => {
    const cargarPagos = async () => {
      const res = await fetch(`/api/pagos/asociados/${asociadoId}`)
      const data = await res.json()
      console.log('🔄 Pagos cargados:', data)
      setPagos(data)
    }
    cargarPagos()
  }, [asociadoId])

  const añoActual = new Date().getFullYear()
  const pagosPorMes: Pago[] = mesesEnum.map(mes => {
    const existente = pagos.find(p => p.mes === mes && p.año === añoActual)
    return existente || { mes, año: añoActual, estado: 'PENDIENTE' }
  })

  const handleCambio = (mes: MesEnum, campo: keyof Pago, valor: string) => {
    const original = pagosPorMes.find(p => p.mes === mes)
    if (!original) return

    const anteriorEditado = pagosEditados[mes] || original
    const modificado = { ...anteriorEditado, [campo]: valor }

    console.log(`✏️ Editado ${mes}:`, modificado)
    setPagosEditados(prev => ({ ...prev, [mes]: modificado }))
  }

  const subirComprobante = async (mes: MesEnum, file: File) => {
    const formData = new FormData()
    formData.append('file', file)
    const res = await fetch('/api/upload/comprobante', { method: 'POST', body: formData })
    const data = await res.json()
    if (data.secure_url) {
      console.log(`📎 Comprobante subido (${mes}):`, data.secure_url)
      handleCambio(mes, 'comprobanteUrl', data.secure_url)
    }
  }

  const guardarCambios = async () => {
    const entradas = Object.entries(pagosEditados)
    console.log('💾 Guardando pagos:', entradas)
    for (const [, pago] of entradas) {
      const metodo = pago.id ? 'PUT' : 'POST'
      const url = pago.id ? `/api/pagos/${pago.id}` : '/api/pagos'
      await fetch(url, {
        method: metodo,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...pago, asociadoId }),
      })
    }
    setPagosEditados({} as Record<MesEnum, Pago>)
    onClose()
  }

  return (
  <div className="pagos-modal-overlay" onClick={onClose}>
    <div className="pagos-modal" onClick={(e) => e.stopPropagation()}>
      <h3 className="pagos-modalh3">Pagos de {apellido}, {nombre}</h3>

      <table className="pagos-tabla">
        <thead>
          <tr>
            <th>Mes</th>
            <th>Estado</th>
            <th>Comentario</th>
            <th>Comprobante</th>
            <th>Ver</th>
          </tr>
        </thead>
        <tbody>
  {pagosPorMes.map(p => (
    <tr key={p.mes}>
      <td>{p.mes.charAt(0) + p.mes.slice(1).toLowerCase()}</td>
      <td>
        <select
          value={pagosEditados[p.mes]?.estado || p.estado}
          onChange={(e) => handleCambio(p.mes, 'estado', e.target.value as EstadoPago)}
          className={`estado-select ${pagosEditados[p.mes]?.estado || p.estado}`}
        >
          <option value="PENDIENTE">Pendiente</option>
          <option value="PAGADO">Abono</option>
          <option value="IMPAGO">Impago</option>
        </select>
      </td>
      <td>
        <input
          type="text"
          value={pagosEditados[p.mes]?.comentario ?? p.comentario ?? ''}
          onChange={(e) => handleCambio(p.mes, 'comentario', e.target.value)}
        />
      </td>
      <td>
        <input
          type="file"
          accept="image/*,application/pdf"
          onChange={e => {
            if (e.target.files?.[0]) subirComprobante(p.mes, e.target.files[0])
          }}
        />
      </td>
      <td>
        {(pagosEditados[p.mes]?.comprobanteUrl || p.comprobanteUrl) ? (
          <a
            href={pagosEditados[p.mes]?.comprobanteUrl || p.comprobanteUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#53107F', fontWeight: 'bold', textDecoration: 'underline' }}
          >
            Ver
          </a>
        ) : '—'}
      </td>
    </tr>
  ))}
</tbody>

      </table>

      <button className="pagos-guardar" onClick={guardarCambios}>Guardar Cambios</button>
      <button className="pagos-cerrar" onClick={onClose}>Cerrar</button>
    </div>
  </div>
  )
}
