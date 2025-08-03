import React, { useState, useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info, ShoppingCart, CreditCard } from 'lucide-react';

interface NotificationProps {
  id: string;
  title: string;
  message: string;
  type?: 'success' | 'error' | 'info' | 'order' | 'payment';
  duration?: number;
  onClose: (id: string) => void;
}

const Notification: React.FC<NotificationProps> = ({
  id,
  title,
  message,
  type = 'info',
  duration = 5000,
  onClose,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => onClose(id), 300); // Wait for animation to complete
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, id, onClose]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => onClose(id), 300);
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case 'order':
        return <ShoppingCart className="h-5 w-5 text-amber-500" />;
      case 'payment':
        return <CreditCard className="h-5 w-5 text-purple-500" />;
      default:
        return <Info className="h-5 w-5 text-blue-500" />;
    }
  };

  const getBgColor = () => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'error':
        return 'bg-red-50 border-red-200';
      case 'order':
        return 'bg-amber-50 border-amber-200';
      case 'payment':
        return 'bg-purple-50 border-purple-200';
      default:
        return 'bg-blue-50 border-blue-200';
    }
  };

  return (
    <div
      className={`
        ${getBgColor()}
        ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
        fixed top-4 right-4 z-50 w-80 rounded-lg border p-4 shadow-md
        transition-all duration-300 ease-in-out
      `}
    >
      <div className="flex items-start">
        <div className="flex-shrink-0">{getIcon()}</div>
        <div className="ml-3 w-0 flex-1">
          <p className="text-sm font-medium text-gray-900">{title}</p>
          <p className="mt-1 text-sm text-gray-500">{message}</p>
        </div>
        <button
          onClick={handleClose}
          className="ml-4 flex-shrink-0 rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400 p-1"
        >
          <X className="h-4 w-4 text-gray-400" />
        </button>
      </div>
    </div>
  );
};

export default Notification;