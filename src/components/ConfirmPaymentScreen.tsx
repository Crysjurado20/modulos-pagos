import React, { useState } from 'react';
import { ArrowLeft, CreditCard, Wallet, Building2, ChevronRight, Shield, Clock, Plus } from 'lucide-react';
import type { Screen, PaymentData } from '../App';
import type { CreditCardData } from './CreditCardFormScreen';

interface ConfirmPaymentScreenProps {
  onNavigate: (screen: Screen) => void;
  paymentData: PaymentData;
  creditCards: CreditCardData[];
}

export function ConfirmPaymentScreen({ onNavigate, paymentData, creditCards }: ConfirmPaymentScreenProps) {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('savings');
  const [isProcessing, setIsProcessing] = useState(false);

  const defaultPaymentMethods = [
    {
      id: 'savings',
      icon: Wallet,
      name: 'Cuenta de Ahorros',
      detail: '***1234',
      balance: '$2,450.75',
      type: 'account' as const,
    },
    {
      id: 'checking',
      icon: Building2,
      name: 'Cuenta Corriente',
      detail: '***5678',
      balance: '$5,820.30',
      type: 'account' as const,
    },
  ];

  // Agregar tarjetas de crédito dinámicamente
  const creditCardMethods = creditCards.map(card => ({
    id: card.id,
    icon: CreditCard,
    name: `Tarjeta ${card.cardType.toUpperCase()}`,
    detail: `***${card.lastFour}`,
    balance: 'Disponible',
    type: 'credit' as const,
    cardData: card,
  }));

  const allPaymentMethods = [
    ...defaultPaymentMethods,
    ...creditCardMethods,
    {
      id: 'add-card',
      icon: Plus,
      name: 'Agregar nueva tarjeta',
      detail: 'Visa, Mastercard, Amex',
      balance: '',
      type: 'add' as const,
    },
  ];

  const handlePaymentMethodClick = (methodId: string, methodType: string) => {
    if (methodType === 'add') {
      onNavigate('credit-card-form');
    } else {
      setSelectedPaymentMethod(methodId);
    }
  };

  const handleConfirmPayment = () => {
    setIsProcessing(true);
    // Simulación de procesamiento
    setTimeout(() => {
      setIsProcessing(false);
      onNavigate('receipt');
    }, 2000);
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
        <div className="flex flex-col h-screen bg-white">
          {/* Header */}
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-300 px-6 pt-12 pb-6">
            <div className="flex items-center justify-between mb-4">
              <button 
                onClick={() => onNavigate('water-payment')} 
                className="p-2 -ml-2 active:scale-95"
                disabled={isProcessing}
              >
                <ArrowLeft className="w-6 h-6 text-gray-800" />
              </button>
              <h1 className="text-gray-800">Confirmar Pago</h1>
              <div className="w-6 h-6" />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-6 py-6">
        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm">✓</div>
            <span className="text-xs text-gray-700">Datos</span>
          </div>
          <div className="w-8 h-px bg-gray-300" />
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-gray-900 text-sm">2</div>
            <span className="text-xs text-gray-700">Confirmar</span>
          </div>
          <div className="w-8 h-px bg-gray-300" />
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 text-sm">3</div>
            <span className="text-xs text-gray-500">Pagar</span>
          </div>
        </div>

        {/* Amount Card */}
        <div className="mb-6 p-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl text-white shadow-lg">
          <div className="text-blue-100 text-sm mb-2">Vas a pagar</div>
          <div className="text-4xl mb-4">${paymentData.amount.toFixed(2)}</div>
          <div className="flex items-center gap-2 text-blue-100 text-sm">
            <Clock className="w-4 h-4" />
            {paymentData.period}
          </div>
        </div>

        {/* Payment Summary */}
        <div className="mb-6 p-5 bg-gray-50 rounded-2xl">
          <div className="text-gray-700 text-sm mb-4">Resumen del pago</div>
          
          <div className="space-y-3">
            <div>
              <div className="text-gray-500 text-xs mb-1">Servicio</div>
              <div className="text-gray-900 text-sm">{paymentData.company}</div>
            </div>
            
            <div>
              <div className="text-gray-500 text-xs mb-1">Beneficiario</div>
              <div className="text-gray-900 text-sm">{paymentData.clientName}</div>
            </div>
            
            <div>
              <div className="text-gray-500 text-xs mb-1">Número de cuenta</div>
              <div className="text-gray-900 text-sm">{paymentData.accountNumber}</div>
            </div>
            
            <div>
              <div className="text-gray-500 text-xs mb-1">Dirección</div>
              <div className="text-gray-900 text-xs">{paymentData.address}</div>
            </div>
          </div>
        </div>

        {/* Payment Method Selection */}
        <div className="mb-6">
          <div className="text-gray-700 text-sm mb-3">Selecciona el método de pago</div>
          <div className="space-y-2">
            {allPaymentMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => handlePaymentMethodClick(method.id, method.type)}
                disabled={isProcessing}
                className={`w-full flex items-center justify-between p-4 rounded-xl transition-all active:scale-98 ${
                  method.type === 'add'
                    ? 'bg-purple-50 border-2 border-purple-200 hover:border-purple-400'
                    : selectedPaymentMethod === method.id
                    ? 'bg-yellow-50 border-2 border-yellow-400 shadow-md'
                    : 'bg-white border-2 border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    method.type === 'add'
                      ? 'bg-purple-100'
                      : selectedPaymentMethod === method.id 
                      ? 'bg-yellow-400' 
                      : 'bg-gray-100'
                  }`}>
                    <method.icon className={`w-5 h-5 ${
                      method.type === 'add'
                        ? 'text-purple-600'
                        : selectedPaymentMethod === method.id 
                        ? 'text-gray-900' 
                        : 'text-gray-600'
                    }`} />
                  </div>
                  <div className="text-left">
                    <div className={`text-sm ${
                      method.type === 'add' ? 'text-purple-900' : 'text-gray-900'
                    }`}>
                      {method.name}
                    </div>
                    <div className={`text-xs ${
                      method.type === 'add' ? 'text-purple-600' : 'text-gray-500'
                    }`}>
                      {method.detail}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {method.balance && (
                    <div className="text-gray-600 text-xs">{method.balance}</div>
                  )}
                  <ChevronRight className={`w-5 h-5 ${
                    method.type === 'add'
                      ? 'text-purple-600'
                      : selectedPaymentMethod === method.id 
                      ? 'text-yellow-600' 
                      : 'text-gray-400'
                  }`} />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Security Notice */}
        <div className="mb-6 flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-xl">
          <Shield className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
          <div>
            <div className="text-green-900 text-sm mb-1">Transacción segura</div>
            <div className="text-green-700 text-xs leading-relaxed">
              Tu información está protegida con encriptación de última generación
            </div>
          </div>
        </div>

        {/* Confirm Button */}
        <button
          onClick={handleConfirmPayment}
          disabled={isProcessing}
          className="w-full py-4 bg-blue-500 text-white rounded-xl hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors active:scale-98 shadow-lg mb-4"
        >
          {isProcessing ? (
            <span className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Procesando pago...
            </span>
          ) : (
            'Confirmar y pagar'
          )}
        </button>

        {/* Cancel Button */}
        <button
          onClick={() => onNavigate('water-payment')}
          disabled={isProcessing}
          className="w-full py-3 text-gray-600 hover:text-gray-900 transition-colors disabled:opacity-50"
        >
          Cancelar
        </button>
        </div>
      </div>
      </div>
    </div>
  );
}
