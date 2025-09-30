'use client';
import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { ConfiguracionGeneral } from '@/types/config';

export default function ConfiguracionPage() {
  const [config, setConfig] = useState<ConfiguracionGeneral>({
    nombre_empresa: '',
    ruc: '',
    razon_social: '',
    codigo_sucursal_default: '0000',
    punto_facturacion_default: '001',
  });
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    cargarConfiguracion();
  }, []);

  const cargarConfiguracion = async () => {
    const { data } = await supabase
      .from('configuracion')
      .select('*')
      .single();
    if (data) setConfig(data);
  };

  const guardar = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase
      .from('configuracion')
      .upsert({
        ...config,
        updated_at: new Date().toISOString(),
      });

    if (!error) alert('Configuración guardada');
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Configuración General</h1>
      
      <form onSubmit={guardar} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Nombre Empresa</label>
          <input
            type="text"
            value={config.nombre_empresa}
            onChange={(e) => setConfig({...config, nombre_empresa: e.target.value})}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">RUC</label>
          <input
            type="text"
            value={config.ruc}
            onChange={(e) => setConfig({...config, ruc: e.target.value})}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Razón Social</label>
          <input
            type="text"
            value={config.razon_social}
            onChange={(e) => setConfig({...config, razon_social: e.target.value})}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Código Sucursal</label>
            <input
              type="text"
              value={config.codigo_sucursal_default}
              onChange={(e) => setConfig({...config, codigo_sucursal_default: e.target.value})}
              className="w-full px-4 py-2 border rounded-lg"
              maxLength={4}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Punto Facturación</label>
            <input
              type="text"
              value={config.punto_facturacion_default}
              onChange={(e) => setConfig({...config, punto_facturacion_default: e.target.value})}
              className="w-full px-4 py-2 border rounded-lg"
              maxLength={3}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
        >
          {loading ? 'Guardando...' : 'Guardar Configuración'}
        </button>
      </form>
    </div>
  );
}
