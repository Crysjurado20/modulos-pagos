import React from 'react';
import { CheckCircle2, Download, Share2, Home, Calendar, Clock, Hash, Building2 } from 'lucide-react';
import type { Screen, PaymentData } from '../App';

interface ReceiptScreenProps {
  onNavigate: (screen: Screen) => void;
  paymentData: PaymentData;
}

export function ReceiptScreen({ onNavigate, paymentData }: ReceiptScreenProps) {
  const transactionNumber = '2025102312345678';
  const transactionDate = new Date().toLocaleString('es-EC', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const handleDownload = () => {
    // Simulación de descarga
    alert('El comprobante se descargará en formato PDF');
  };

  const handleShare = () => {
    // Simulación de compartir
    alert('Compartir comprobante por email o WhatsApp');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      {/* Mobile Phone Frame */}
      <div className="w-full max-w-sm bg-black rounded-3xl shadow-2xl overflow-hidden border-8 border-gray-900">
        {/* Phone notch (optional - comment out if not needed) */}
        <div className="bg-black h-6 flex justify-center pt-1">
          <div className="w-32 h-5 bg-black rounded-b-2xl"></div>
        </div>
        
        {/* Screen Content */}
        <div className="flex flex-col h-screen bg-gradient-to-b from-green-50 to-white">
          {/* Success Header */}
          <div className="px-6 pt-12 pb-8 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500 rounded-full mb-4 animate-in zoom-in duration-500">
              <CheckCircle2 className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-gray-900 text-xl mb-2">¡Pago exitoso!</h1>
            <p className="text-gray-600 text-sm">Tu pago se ha procesado correctamente</p>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-6 pb-6">
        {/* Amount Card */}
        <div className="mb-6 p-6 bg-white rounded-2xl shadow-lg text-center">
          <div className="text-gray-600 text-sm mb-2">Monto pagado</div>
          <div className="text-gray-900 text-4xl mb-3">${paymentData.amount.toFixed(2)}</div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 rounded-full">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-green-700 text-xs">Procesado</span>
          </div>
        </div>

        {/* Transaction Details */}
        <div className="mb-6 p-5 bg-white rounded-2xl shadow-md">
          <div className="text-gray-700 text-sm mb-4">Detalles de la transacción</div>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Building2 className="w-4 h-4 text-gray-600" />
              </div>
              <div className="flex-1">
                <div className="text-gray-500 text-xs mb-1">Servicio</div>
                <div className="text-gray-900 text-sm">{paymentData.company}</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Hash className="w-4 h-4 text-gray-600" />
              </div>
              <div className="flex-1">
                <div className="text-gray-500 text-xs mb-1">Número de cuenta</div>
                <div className="text-gray-900 text-sm">{paymentData.accountNumber}</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Calendar className="w-4 h-4 text-gray-600" />
              </div>
              <div className="flex-1">
                <div className="text-gray-500 text-xs mb-1">Periodo</div>
                <div className="text-gray-900 text-sm">{paymentData.period}</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Clock className="w-4 h-4 text-gray-600" />
              </div>
              <div className="flex-1">
                <div className="text-gray-500 text-xs mb-1">Fecha y hora</div>
                <div className="text-gray-900 text-sm">{transactionDate}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Transaction Number */}
        <div className="mb-6 p-4 bg-gray-50 border border-gray-200 rounded-xl">
          <div className="text-gray-600 text-xs mb-2 text-center">Número de transacción</div>
          <div className="text-gray-900 text-center font-mono">{transactionNumber}</div>
          <div className="text-gray-500 text-xs text-center mt-2">
            Guarda este número para cualquier reclamo
          </div>
        </div>

        {/* Payment Details */}
        <div className="mb-6 p-4 bg-white border border-gray-200 rounded-xl">
          <div className="text-gray-700 text-sm mb-3">Desglose del pago</div>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-gray-600">Consumo de agua</span>
              <span className="text-gray-900">$20.00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Alcantarillado</span>
              <span className="text-gray-900">$6.50</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Recolección de basura</span>
              <span className="text-gray-900">$2.00</span>
            </div>
            <div className="h-px bg-gray-200 my-2" />
            <div className="flex justify-between">
              <span className="text-gray-900">Total pagado</span>
              <span className="text-gray-900">${paymentData.amount.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 mb-6">
          <button
            onClick={handleDownload}
            className="w-full flex items-center justify-center gap-2 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors active:scale-98 shadow-md"
          >
            <Download className="w-5 h-5" />
            Descargar comprobante
          </button>

          <button
            onClick={handleShare}
            className="w-full flex items-center justify-center gap-2 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors active:scale-98"
          >
            <Share2 className="w-5 h-5" />
            Compartir comprobante
          </button>
        </div>

        {/* Info Box */}
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
          <div className="text-blue-900 text-xs leading-relaxed">
            <strong>Importante:</strong> El pago puede tardar hasta 24 horas en reflejarse en tu cuenta de agua. Conserva este comprobante como respaldo.
          </div>
        </div>

        {/* Home Button */}
        <button
          onClick={() => onNavigate('home')}
          className="w-full flex items-center justify-center gap-2 py-4 bg-yellow-400 text-gray-900 rounded-xl hover:bg-yellow-500 transition-colors active:scale-98 shadow-lg"
        >
          <Home className="w-5 h-5" />
          Volver al inicio
        </button>
        </div>
      </div>
      </div>
    </div>
  );
}
