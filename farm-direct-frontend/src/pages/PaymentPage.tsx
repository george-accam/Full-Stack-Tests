import React, { useState } from 'react';
import { ShoppingBag, CreditCard } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import PaymentForm, { PaymentData } from '../components/payment/PaymentForm';
import OrderSummary from '../components/payment/OrderSummary';
import Modal from '../components/ui/Modal';
import { products } from '../data/mockData';

const PaymentPage: React.FC = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  
  // Mock cart items
  const cartItems = [
    { product: products[0], quantity: 2 },
    { product: products[1], quantity: 3 },
  ];
  
  const subtotal = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );
  const deliveryFee = 5.99;
  const total = subtotal + deliveryFee;
  
  const handlePaymentSubmit = (data: PaymentData) => {
    setIsLoading(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccessModalOpen(true);
    }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Checkout</h1>
        <p className="text-gray-600">
          Complete your purchase securely
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Payment Method</h2>
          <PaymentForm
            amount={total}
            onSubmit={handlePaymentSubmit}
            isLoading={isLoading}
          />
        </div>
        
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Order Summary</h2>
          <OrderSummary
            items={cartItems}
            deliveryAddress={user?.location || 'Accra, Ghana'}
            subtotal={subtotal}
            deliveryFee={deliveryFee}
            total={total}
          />
        </div>
      </div>
      
      {/* Success Modal */}
      <Modal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        title="Payment Successful"
        size="md"
      >
        <div className="text-center py-6">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
            <CreditCard className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Your payment was successful!
          </h3>
          <p className="text-gray-600 mb-6">
            Your order has been placed and will be processed shortly. You will receive a confirmation email with your order details.
          </p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => setIsSuccessModalOpen(false)}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Continue Shopping
            </button>
            <button
              onClick={() => window.location.href = '/orders'}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              View Orders
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default PaymentPage;