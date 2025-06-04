import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Pago } from '@/types/pago';
import { Asociado } from '@/types/asociado';
import '@/styles/components/RegistrarPagoPopup.css';

interface RegistrarPagoPopupProps {
  onClose: () => void;
  onPagoRegistrado: () => void;
}

const RegistrarPagoPopup: React.FC<RegistrarPagoPopupProps> = ({ onClose, onPagoRegistrado }) => {
  const [asociados, setAsociados] = useState<Asociado[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [nuevoPago, setNuevoPago] = useState<Partial<Pago>>({
    monto: 0,
    fecha: new Date().toISOString().split('T')[0],
    estado: 'pendiente'
  });

  useEffect(() => {
    const cargarAsociados = async () => {
      try {
        const res = await fetch('/api/asociados/all');
        const asociadosData = await res.json();
        setAsociados(asociadosData);
      } catch (err) {
        setError('Error al cargar los asociados');
      } finally {
        setLoading(false);
      }
    };
    cargarAsociados();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nuevoPago.asociadoId || !nuevoPago.monto || !nuevoPago.fecha) {
      setError('Por favor complete todos los campos requeridos');
      return;
    }
    try {
      await fetch('/api/pagos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoPago)
      });
      onPagoRegistrado();
      onClose();
    } catch (err) {
      setError('Error al registrar el pago');
    }
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="popup-overlay">
      <div className="popup">
        <h3>Registrar Nuevo Pago</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="asociado">Asociado</label>
            <select
              id="asociado"
              value={nuevoPago.asociadoId || ''}
              onChange={(e) => setNuevoPago({ ...nuevoPago, asociadoId: Number(e.target.value) })}
              required
            >
              <option value="">Seleccione un asociado</option>
              {asociados.map((asociado) => (
                <option key={asociado.id} value={asociado.id}>
                  {asociado.nombre} {asociado.apellido}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="monto">Monto</label>
            <input
              id="monto"
              type="number"
              value={nuevoPago.monto || ''}
              onChange={(e) => setNuevoPago({ ...nuevoPago, monto: Number(e.target.value) })}
              required
              min="0"
              step="0.01"
            />
          </div>

          <div className="form-group">
            <label htmlFor="fecha">Fecha</label>
            <input
              id="fecha"
              type="date"
              value={nuevoPago.fecha || ''}
              onChange={(e) => setNuevoPago({ ...nuevoPago, fecha: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="estado">Estado</label>
            <select
              id="estado"
              value={nuevoPago.estado || 'pendiente'}
              onChange={(e) => setNuevoPago({ ...nuevoPago, estado: e.target.value as Pago['estado'] })}
              required
            >
              <option value="pendiente">Pendiente</option>
              <option value="pagado">Pagado</option>
              <option value="rechazado">Rechazado</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="comprobante">Comprobante (URL)</label>
            <input
              id="comprobante"
              type="text"
              value={nuevoPago.comprobante || ''}
              onChange={(e) => setNuevoPago({ ...nuevoPago, comprobante: e.target.value })}
              placeholder="URL del comprobante (opcional)"
            />
          </div>

          <div className="form-group">
            <label htmlFor="observaciones">Observaciones</label>
            <input
              id="observaciones"
              type="text"
              value={nuevoPago.observaciones || ''}
              onChange={(e) => setNuevoPago({ ...nuevoPago, observaciones: e.target.value })}
              placeholder="Observaciones (opcional)"
            />
          </div>

          <div className="popup-footer">
            <button type="submit" className="boton-guardar">
              Registrar
            </button>
            <button type="button" className="boton-cerrar" onClick={onClose}>
              Cerrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrarPagoPopup; 