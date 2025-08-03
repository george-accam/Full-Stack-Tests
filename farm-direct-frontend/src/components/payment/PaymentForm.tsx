import React, { useState } from 'react';
import { CreditCard, Smartphone, Building } from 'lucide-react';
import Input from '../ui/Input';
import Button from '../ui/Button';

interface PaymentFormProps {
  amount: number;
  onSubmit: (data: PaymentData) => void;
  isLoading?: boolean;
}

export interface PaymentData {
  method: 'momo' | 'card' | 'bank';
  details: {
    [key: string]: string;
  };
}

const PaymentForm: React.FC<PaymentFormProps> = ({
  amount,
  onSubmit,
  isLoading = false,
}) => {
  const [paymentMethod, setPaymentMethod] = useState<'momo' | 'card' | 'bank'>('momo');
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleMethodChange = (method: 'momo' | 'card' | 'bank') => {
    setPaymentMethod(method);
    setFormData({});
    setErrors({});
  };

  const handleChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is updated
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (paymentMethod === 'momo') {
      if (!formData.phoneNumber) newErrors.phoneNumber = 'Phone number is required';
      else if (!/^\+?[0-9]{10,15}$/.test(formData.phoneNumber)) {
        newErrors.phoneNumber = 'Enter a valid phone number';
      }
      if (!formData.network) newErrors.network = 'Network provider is required';
    } else if (paymentMethod === 'card') {
      if (!formData.cardNumber) newErrors.cardNumber = 'Card number is required';
      else if (!/^[0-9]{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) {
        newErrors.cardNumber = 'Enter a valid 16-digit card number';
      }
      if (!formData.expiryDate) newErrors.expiryDate = 'Expiry date is required';
      else if (!/^(0[1-9]|1[0-2])\/[0-9]{2}$/.test(formData.expiryDate)) {
        newErrors.expiryDate = 'Enter a valid expiry date (MM/YY)';
      }
      if (!formData.cvv) newErrors.cvv = 'CVV is required';
      else if (!/^[0-9]{3,4}$/.test(formData.cvv)) {
        newErrors.cvv = 'Enter a valid CVV';
      }
      if (!formData.cardholderName) newErrors.cardholderName = 'Cardholder name is required';
    } else if (paymentMethod === 'bank') {
      if (!formData.accountNumber) newErrors.accountNumber = 'Account number is required';
      if (!formData.bankName) newErrors.bankName = 'Bank name is required';
      if (!formData.accountName) newErrors.accountName = 'Account name is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit({
        method: paymentMethod,
        details: formData,
      });
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Payment Amount
        </h3>
        <div className="text-2xl font-bold text-green-600">
          GH₵ {amount.toFixed(2)}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Payment Method
        </h3>
        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => handleMethodChange("momo")}
            className={`
              flex flex-col items-center justify-center p-3 rounded-md border-2 transition-all
              ${
                paymentMethod === "momo"
                  ? "border-green-500 bg-green-50"
                  : "border-gray-200 hover:border-gray-300"
              }
            `}
          >
            <Smartphone
              className={`h-6 w-6 ${
                paymentMethod === "momo" ? "text-green-500" : "text-gray-500"
              }`}
            />
            <span
              className={`mt-1 text-sm font-medium ${
                paymentMethod === "momo" ? "text-green-700" : "text-gray-700"
              }`}
            >
              Mobile Money
            </span>
          </button>

          <button
            type="button"
            onClick={() => handleMethodChange("card")}
            className={`
              flex flex-col items-center justify-center p-3 rounded-md border-2 transition-all
              ${
                paymentMethod === "card"
                  ? "border-green-500 bg-green-50"
                  : "border-gray-200 hover:border-gray-300"
              }
            `}
          >
            <CreditCard
              className={`h-6 w-6 ${
                paymentMethod === "card" ? "text-green-500" : "text-gray-500"
              }`}
            />
            <span
              className={`mt-1 text-sm font-medium ${
                paymentMethod === "card" ? "text-green-700" : "text-gray-700"
              }`}
            >
              Credit Card
            </span>
          </button>

          <button
            type="button"
            onClick={() => handleMethodChange("bank")}
            className={`
              flex flex-col items-center justify-center p-3 rounded-md border-2 transition-all
              ${
                paymentMethod === "bank"
                  ? "border-green-500 bg-green-50"
                  : "border-gray-200 hover:border-gray-300"
              }
            `}
          >
            <Building
              className={`h-6 w-6 ${
                paymentMethod === "bank" ? "text-green-500" : "text-gray-500"
              }`}
            />
            <span
              className={`mt-1 text-sm font-medium ${
                paymentMethod === "bank" ? "text-green-700" : "text-gray-700"
              }`}
            >
              Bank Transfer
            </span>
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {paymentMethod === "momo" && (
          <>
            <Input
              label="Phone Number"
              placeholder="e.g., +233 20 123 4567"
              value={formData.phoneNumber || ""}
              onChange={(e) => handleChange("phoneNumber", e.target.value)}
              error={errors.phoneNumber}
              fullWidth
            />

            <Input
              label="Network Provider"
              placeholder="e.g., MTN, Vodafone, AirtelTigo"
              value={formData.network || ""}
              onChange={(e) => handleChange("network", e.target.value)}
              error={errors.network}
              fullWidth
            />
          </>
        )}

        {paymentMethod === "card" && (
          <>
            <Input
              label="Card Number"
              placeholder="1234 5678 9012 3456"
              value={formData.cardNumber || ""}
              onChange={(e) => handleChange("cardNumber", e.target.value)}
              error={errors.cardNumber}
              fullWidth
            />

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Expiry Date"
                placeholder="MM/YY"
                value={formData.expiryDate || ""}
                onChange={(e) => handleChange("expiryDate", e.target.value)}
                error={errors.expiryDate}
                fullWidth
              />

              <Input
                label="CVV"
                placeholder="123"
                value={formData.cvv || ""}
                onChange={(e) => handleChange("cvv", e.target.value)}
                error={errors.cvv}
                fullWidth
              />
            </div>

            <Input
              label="Cardholder Name"
              placeholder="John Doe"
              value={formData.cardholderName || ""}
              onChange={(e) => handleChange("cardholderName", e.target.value)}
              error={errors.cardholderName}
              fullWidth
            />
          </>
        )}

        {paymentMethod === "bank" && (
          <>
            <Input
              label="Bank Name"
              placeholder="e.g., Ghana Commercial Bank"
              value={formData.bankName || ""}
              onChange={(e) => handleChange("bankName", e.target.value)}
              error={errors.bankName}
              fullWidth
            />

            <Input
              label="Account Number"
              placeholder="e.g., 1234567890"
              value={formData.accountNumber || ""}
              onChange={(e) => handleChange("accountNumber", e.target.value)}
              error={errors.accountNumber}
              fullWidth
            />

            <Input
              label="Account Name"
              placeholder="e.g., John Doe"
              value={formData.accountName || ""}
              onChange={(e) => handleChange("accountName", e.target.value)}
              error={errors.accountName}
              fullWidth
            />
          </>
        )}

        <div className="pt-4">
          <Button type="submit" fullWidth isLoading={isLoading}>
            Complete Payment
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PaymentForm;