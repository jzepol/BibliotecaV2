import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Pago } from '@/types/pago';
import { Asociado } from '@/types/asociado';
import '@/styles/components/EditarPagoPopup.css';

interface EditarPagoPopupProps {
  pagoId: number;
  onClose: () => void;
  onPagoActualizado: () => void;
}

const EditarPagoPopup: React.FC<EditarPagoPopupProps> = ({ pagoId, onClose, onPagoActualizado }) => {
  const [pago, setPago] = useState<Pago | null>(null);
  const [asociados, setAsociados] = useState<Asociado[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const [pagoRes, asociadosRes] = await Promise.all([
          fetch(`/api/pagos/${pagoId}`),
          fetch('/api/asociados/all')
        ]);
        const pagoData = await pagoRes.json();
        const asociadosData = await asociadosRes.json();
        setPago(pagoData);
        setAsociados(asociadosData);
      } catch (err) {
        setError('Error al cargar los datos');
      } finally {
        setLoading(false);
      }
    };
    cargarDatos();
  }, [pagoId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pago) return;
    try {
      await fetch(`/api/pagos/${pagoId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pago)
      });
      onPagoActualizado();
      onClose();
    } catch (err) {
      setError('Error al actualizar el pago');
    }
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;
  if (!pago) return <div>No se encontró el pago</div>;

  return (
    <div className="popup-overlay">
      <div className="popup">
        <h3>Editar Pago</h3>
        <form onSubmit={handleSubmit}>
          <table className="table">
            <tbody>
              <tr>
                <th>Asociado</th>
                <td>
                  <select
                    value={pago.asociadoId}
                    onChange={(e) => setPago({ ...pago, asociadoId: Number(e.target.value) })}
                  >
                    {asociados.map((asociado) => (
                      <option key={asociado.id} value={asociado.id}>
                        {asociado.nombre} {asociado.apellido}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
              <tr>
                <th>Monto</th>
                <td>
                  <input
                    type="number"
                    value={(pago as any).monto || ''}
                    onChange={(e) => setPago({ ...pago, monto: Number(e.target.value) } as any)}
                  />
                </td>
              </tr>
              <tr>
                <th>Fecha</th>
                <td>
                  <input
                    type="date"
                    value={(pago as any).fecha || ''}
                    onChange={(e) => setPago({ ...pago, fecha: e.target.value } as any)}
                  />
                </td>
              </tr>
              <tr>
                <th>Estado</th>
                <td>
                  <select
                    value={pago.estado}
                    onChange={(e) => setPago({ ...pago, estado: e.target.value as Pago['estado'] })}
                  >
                    <option value="pendiente">Pendiente</option>
                    <option value="pagado">Pagado</option>
                    <option value="rechazado">Rechazado</option>
                  </select>
                </td>
              </tr>
              <tr>
                <th>Comprobante</th>
                <td>
                  {pago.comprobante ? (
                    <a href={pago.comprobante} target="_blank" rel="noopener noreferrer" className="link-comprobante">
                      Ver comprobante
                    </a>
                  ) : (
                    <input
                      type="text"
                      value={pago.comprobante || ''}
                      onChange={(e) => setPago({ ...pago, comprobante: e.target.value })}
                      placeholder="URL del comprobante"
                    />
                  )}
                </td>
              </tr>
              <tr>
                <th>Observaciones</th>
                <td>
                  <input
                    type="text"
                    value={pago.observaciones || ''}
                    onChange={(e) => setPago({ ...pago, observaciones: e.target.value })}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <div className="popup-footer">
            <button type="submit" className="boton-guardar">
              Guardar
            </button>
            <button type="button" className="boton-cerrar" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditarPagoPopup; 