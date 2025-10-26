import React, { useState } from 'react';
import { ArrowLeft, CreditCard, Eye, EyeOff, Shield, AlertCircle, Calendar, Lock } from 'lucide-react';
import type { Screen } from '../App';

interface CreditCardFormScreenProps {
  onNavigate: (screen: Screen) => void;
  onCardAdded: (cardData: CreditCardData) => void;
}

export interface CreditCardData {
  id: string;
  cardNumber: string;
  cardHolder: string;
  expiryMonth: string;
  expiryYear: string;
  cvv: string;
  cardType: 'visa' | 'mastercard' | 'discover' | 'amex';
  lastFour: string;
}

export function CreditCardFormScreen({ onNavigate, onCardAdded }: CreditCardFormScreenProps) {
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
  });
  const [showCvv, setShowCvv] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Detectar tipo de tarjeta basado en el número
  const detectCardType = (number: string): CreditCardData['cardType'] => {
    const cleanNumber = number.replace(/\s/g, '');
    if (cleanNumber.startsWith('4')) return 'visa';
    if (cleanNumber.startsWith('5') || cleanNumber.startsWith('2')) return 'mastercard';
    if (cleanNumber.startsWith('34') || cleanNumber.startsWith('37')) return 'amex';
    if (cleanNumber.startsWith('6')) return 'discover';
    return 'visa';
  };

  // Formatear número de tarjeta
  const formatCardNumber = (value: string) => {
    const cleanValue = value.replace(/\D/g, '');
    const cardType = detectCardType(cleanValue);
    
    if (cardType === 'amex') {
      // Formato Amex: XXXX XXXXXX XXXXX
      return cleanValue.replace(/(\d{4})(\d{6})(\d{5})/, '$1 $2 $3').substring(0, 17);
    } else {
      // Formato estándar: XXXX XXXX XXXX XXXX
      return cleanValue.replace(/(\d{4})(?=\d)/g, '$1 ').substring(0, 19);
    }
  };

  // Validaciones
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    // Validar número de tarjeta
    const cleanCardNumber = formData.cardNumber.replace(/\s/g, '');
    if (!cleanCardNumber) {
      newErrors.cardNumber = 'El número de tarjeta es requerido';
    } else if (cleanCardNumber.length < 13 || cleanCardNumber.length > 19) {
      newErrors.cardNumber = 'Número de tarjeta inválido';
    }

    // Validar titular
    if (!formData.cardHolder.trim()) {
      newErrors.cardHolder = 'El nombre del titular es requerido';
    } else if (formData.cardHolder.trim().length < 3) {
      newErrors.cardHolder = 'Nombre muy corto';
    }

    // Validar mes de expiración
    if (!formData.expiryMonth) {
      newErrors.expiryMonth = 'Mes requerido';
    } else if (parseInt(formData.expiryMonth) < 1 || parseInt(formData.expiryMonth) > 12) {
      newErrors.expiryMonth = 'Mes inválido';
    }

    // Validar año de expiración
    const currentYear = new Date().getFullYear();
    if (!formData.expiryYear) {
      newErrors.expiryYear = 'Año requerido';
    } else if (parseInt(formData.expiryYear) < currentYear) {
      newErrors.expiryYear = 'Tarjeta expirada';
    }

    // Validar CVV
    const cardType = detectCardType(cleanCardNumber);
    const expectedCvvLength = cardType === 'amex' ? 4 : 3;
    if (!formData.cvv) {
      newErrors.cvv = 'CVV requerido';
    } else if (formData.cvv.length !== expectedCvvLength) {
      newErrors.cvv = `CVV debe tener ${expectedCvvLength} dígitos`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Limpiar errores al escribir
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    // Simular validación de tarjeta
    setTimeout(() => {
      const cleanCardNumber = formData.cardNumber.replace(/\s/g, '');
      const cardType = detectCardType(cleanCardNumber);
      const lastFour = cleanCardNumber.slice(-4);
      
      const newCard: CreditCardData = {
        id: `card_${Date.now()}`,
        cardNumber: cleanCardNumber,
        cardHolder: formData.cardHolder.trim(),
        expiryMonth: formData.expiryMonth,
        expiryYear: formData.expiryYear,
        cvv: formData.cvv,
        cardType,
        lastFour,
      };

      onCardAdded(newCard);
      setIsSubmitting(false);
      onNavigate('confirm');
    }, 2000);
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 15 }, (_, i) => currentYear + i);
  const months = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      {/* Mobile Phone Frame */}
      <div className="w-full max-w-sm bg-black rounded-3xl shadow-2xl overflow-hidden border-8 border-gray-900">
        {/* Phone notch (optional - comment out if not needed) */}
        <div className="bg-black h-6 flex justify-center pt-1">
          <div className="w-32 h-5 bg-black rounded-b-2xl"></div>
        </div>
        
        {/* Screen Content */}
        <div className="flex flex-col h-screen bg-white overflow-y-auto">
          {/* Header */}
          <div className="w-full max-w-md mx-auto pt-6 px-6">
            <div className="flex items-center justify-between mb-4">
              <button 
                onClick={() => onNavigate('confirm')} 
                className="p-2 -ml-2 active:scale-95"
                disabled={isSubmitting}
              >
                <ArrowLeft className="w-6 h-6 text-purple-600" />
              </button>
              <h1 className="text-purple-700 font-bold text-lg">Agregar Tarjeta</h1>
              <div className="w-6 h-6" />
            </div>

  
        {/* Security Notice */}
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl shadow-sm">
          <div className="flex gap-3 items-center">
            <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <div className="text-blue-900 text-sm font-semibold mb-1">Información segura</div>
              <div className="text-blue-700 text-xs leading-relaxed">
                Tus datos están protegidos con encriptación SSL y no se almacenan en nuestros servidores.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Formulario */}
      <div className="w-full max-w-xs mx-auto px-4">
        <div className="space-y-4">
          {/* Número de tarjeta */}
          <div>
            <label className="block text-gray-700 text-sm mb-2">
              Número de tarjeta *
            </label>
            <div className="relative">
              <input
                type="text"
                value={formData.cardNumber}
                onChange={(e) => handleInputChange('cardNumber', formatCardNumber(e.target.value))}
                placeholder="1234 5678 9012 3456"
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none font-mono text-lg ${
                  errors.cardNumber ? 'border-red-400' : 'border-gray-300 focus:border-purple-500'
                }`}
                maxLength={19}
              />
              <CreditCard className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
            {errors.cardNumber && (
              <div className="flex items-center gap-1 mt-1 text-red-600 text-xs">
                <AlertCircle className="w-3 h-3" />
                {errors.cardNumber}
              </div>
            )}
          </div>

          {/* Titular */}
          <div>
            <label className="block text-gray-700 text-sm mb-2">
              Nombre del titular *
            </label>
            <input
              type="text"
              value={formData.cardHolder}
              onChange={(e) => handleInputChange('cardHolder', e.target.value.toUpperCase())}
              placeholder="JUAN CARLOS PÉREZ"
              className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none ${
                errors.cardHolder ? 'border-red-400' : 'border-gray-300 focus:border-purple-500'
              }`}
              maxLength={30}
            />
            {errors.cardHolder && (
              <div className="flex items-center gap-1 mt-1 text-red-600 text-xs">
                <AlertCircle className="w-3 h-3" />
                {errors.cardHolder}
              </div>
            )}
          </div>

          {/* Fecha de expiración y CVV */}
          <div className="grid grid-cols-3 gap-3">
            {/* Mes */}
            <div>
              <label className="block text-gray-700 text-sm mb-2">
                Mes *
              </label>
              <select
                value={formData.expiryMonth}
                onChange={(e) => handleInputChange('expiryMonth', e.target.value)}
                className={`w-full px-3 py-3 border-2 rounded-xl focus:outline-none ${
                  errors.expiryMonth ? 'border-red-400' : 'border-gray-300 focus:border-purple-500'
                }`}
              >
                <option value="">MM</option>
                {months.map(month => (
                  <option key={month} value={month}>{month}</option>
                ))}
              </select>
              {errors.expiryMonth && (
                <div className="flex items-center gap-1 mt-1 text-red-600 text-xs">
                  <AlertCircle className="w-3 h-3" />
                  {errors.expiryMonth}
                </div>
              )}
            </div>

            {/* Año */}
            <div>
              <label className="block text-gray-700 text-sm mb-2">
                Año *
              </label>
              <select
                value={formData.expiryYear}
                onChange={(e) => handleInputChange('expiryYear', e.target.value)}
                className={`w-full px-3 py-3 border-2 rounded-xl focus:outline-none ${
                  errors.expiryYear ? 'border-red-400' : 'border-gray-300 focus:border-purple-500'
                }`}
              >
                <option value="">AAAA</option>
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
              {errors.expiryYear && (
                <div className="flex items-center gap-1 mt-1 text-red-600 text-xs">
                  <AlertCircle className="w-3 h-3" />
                  {errors.expiryYear}
                </div>
              )}
            </div>

            {/* CVV */}
            <div>
              <label className="block text-gray-700 text-sm mb-2">
                CVV *
              </label>
              <div className="relative">
                <input
                  type={showCvv ? 'text' : 'password'}
                  value={formData.cvv}
                  onChange={(e) => handleInputChange('cvv', e.target.value.replace(/\D/g, ''))}
                  placeholder="123"
                  className={`w-full px-3 py-3 border-2 rounded-xl focus:outline-none font-mono ${
                    errors.cvv ? 'border-red-400' : 'border-gray-300 focus:border-purple-500'
                  }`}
                  maxLength={4}
                />
                <button
                  type="button"
                  onClick={() => setShowCvv(!showCvv)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1"
                >
                  {showCvv ? (
                    <EyeOff className="w-4 h-4 text-gray-400" />
                  ) : (
                    <Eye className="w-4 h-4 text-gray-400" />
                  )}
                </button>
              </div>
              {errors.cvv && (
                <div className="flex items-center gap-1 mt-1 text-red-600 text-xs">
                  <AlertCircle className="w-3 h-3" />
                  {errors.cvv}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* CVV Help */}
        <div className="mt-4 p-3 bg-gray-50 rounded-xl">
          <div className="flex items-center gap-2 text-gray-600 text-xs">
            <Lock className="w-4 h-4" />
            <span>
              El CVV son los {detectCardType(formData.cardNumber) === 'amex' ? '4' : '3'} dígitos 
              en el {detectCardType(formData.cardNumber) === 'amex' ? 'frente' : 'reverso'} de tu tarjeta
            </span>
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-full mt-6 py-4 bg-purple-500 text-white rounded-xl hover:bg-purple-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors active:scale-98 shadow-lg"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Validando tarjeta...
            </span>
          ) : (
            'Agregar tarjeta'
          )}
        </button>

        {/* Cancel Button */}
        <button
          onClick={() => onNavigate('confirm')}
          disabled={isSubmitting}
          className="w-full mt-3 py-3 text-gray-600 hover:text-gray-900 transition-colors disabled:opacity-50"
        >
          Cancelar
        </button>
        </div>
      </div>
      </div>
    </div>
  );
}