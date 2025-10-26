import React from 'react';
import { ArrowLeft, Search, Droplet, Star, Clock } from 'lucide-react';
import type { Screen } from '../App';

interface ServicesScreenProps {
  onNavigate: (screen: Screen) => void;
}

export function ServicesScreen({ onNavigate }: ServicesScreenProps) {
  const waterCompanies = [
    { id: 'epmaps', name: 'EPMAPS - Quito', description: 'Empresa Pública Metropolitana de Agua Potable', isFavorite: true },
    { id: 'etapa', name: 'ETAPA - Cuenca', description: 'Empresa Telecomunicaciones, Agua Potable', isFavorite: false },
    { id: 'emapag', name: 'EMAPAG - Guayaquil', description: 'Empresa Municipal de Agua Potable', isFavorite: false },
    { id: 'emapa', name: 'EMAPA - Ambato', description: 'Empresa Municipal de Agua Potable', isFavorite: false },
  ];

  const recentPayments = [
    { company: 'EPMAPS - Quito', account: '***6789', date: 'Sep 23, 2025' },
  ];

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      {/* Mobile Phone Frame */}
      <div className="w-full max-w-sm bg-black rounded-3xl shadow-2xl overflow-hidden border-8 border-gray-900">
        {/* Phone notch (optional - comment out if not needed) */}
        <div className="bg-black h-6 flex justify-center pt-1">
          <div className="w-32 h-5 bg-black rounded-b-2xl"></div>
        </div>
        
        {/* Screen Content */}
        <div className="flex flex-col h-screen bg-white">
          {/* Header */}
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-300 px-6 pt-12 pb-6">
            <div className="flex items-center justify-between mb-6">
              <button onClick={() => onNavigate('home')} className="p-2 -ml-2 active:scale-95">
                <ArrowLeft className="w-6 h-6 text-gray-800" />
              </button>
              <h1 className="text-gray-800">Pago de Servicios</h1>
              <div className="w-6 h-6" />
            </div>

            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Buscar empresa de agua..."
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-white shadow-md text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-6 py-6">
        {/* Help Card */}
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
          <div className="flex gap-3">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
              <Droplet className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-gray-900 text-sm mb-1">¿Cómo pagar agua potable?</div>
              <div className="text-gray-600 text-xs leading-relaxed">
                1. Selecciona tu empresa de agua<br />
                2. Ingresa tu número de cuenta o contrato<br />
                3. Verifica los datos y confirma el pago
              </div>
            </div>
          </div>
        </div>

        {/* Recent Payments */}
        {recentPayments.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-4 h-4 text-gray-600" />
              <div className="text-gray-700 text-sm">Pagos recientes</div>
            </div>
            <div className="space-y-2">
              {recentPayments.map((payment, index) => (
                <button
                  key={index}
                  onClick={() => onNavigate('water-payment')}
                  className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors active:scale-98"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                      <Droplet className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-left">
                      <div className="text-gray-900 text-sm">{payment.company}</div>
                      <div className="text-gray-500 text-xs">Cuenta: {payment.account}</div>
                    </div>
                  </div>
                  <div className="text-yellow-600 text-xs">Pagar nuevamente</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* All Companies */}
        <div className="mb-3">
          <div className="text-gray-700 text-sm mb-3">Todas las empresas de agua</div>
          <div className="space-y-2">
            {waterCompanies.map((company) => (
              <button
                key={company.id}
                onClick={() => onNavigate('water-payment')}
                className="w-full flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl hover:border-yellow-400 hover:shadow-md transition-all active:scale-98"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Droplet className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="text-left">
                    <div className="text-gray-900 text-sm flex items-center gap-2">
                      {company.name}
                      {company.isFavorite && <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />}
                    </div>
                    <div className="text-gray-500 text-xs">{company.description}</div>
                  </div>
                </div>
                <ArrowLeft className="w-5 h-5 text-gray-400 rotate-180" />
              </button>
            ))}
          </div>
        </div>
        </div>
        </div>
      </div>
    </div>
  );
}
