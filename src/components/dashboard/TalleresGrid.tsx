'use client'

import { Taller } from '@prisma/client'
import '@/styles/components/TalleresGrid.css'

interface Props {
  talleres: Taller[]
  onEdit: (taller: Taller) => void
  onDelete: (id: number) => void
}

export default function TalleresGrid({ talleres, onEdit, onDelete }: Props) {
  return (
    <div className="grid-talleres">
      <h2>Listado de Talleres</h2>
      <div className="tabla-scroll">
        <table>
          <thead>
            <tr>
              <th>Título</th>
              <th>Fecha</th>
              <th>Hora</th>
              <th>Facilitador</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {talleres.map((t) => (
              <tr key={t.id}>
                <td>{t.titulo}</td>
                <td>{new Date(t.fecha).toLocaleDateString()}</td>
                <td>{t.hora}</td>
                <td>{t.facilitador}</td>
                <td>
                  <button className="btn-accion editar" onClick={() => onEdit(t)}>✏️</button>
                  <button className="btn-accion eliminar" onClick={() => onDelete(t.id)}>🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
