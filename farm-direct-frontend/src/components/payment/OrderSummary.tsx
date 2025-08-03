import React from 'react';
import { ShoppingBag, MapPin, Truck } from 'lucide-react';
import Card, { CardHeader, CardContent, CardFooter } from '../ui/Card';
import Badge from '../ui/Badge';
import { Product } from '../../types';

interface OrderSummaryProps {
  items: {
    product: Product;
    quantity: number;
  }[];
  deliveryAddress: string;
  subtotal: number;
  deliveryFee: number;
  total: number;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  items,
  deliveryAddress,
  subtotal,
  deliveryFee,
  total,
}) => {
  return (
    <Card>
      <CardHeader className="bg-green-50">
        <div className="flex items-center">
          <ShoppingBag className="h-5 w-5 text-green-600 mr-2" />
          <h3 className="text-lg font-semibold text-gray-800">Order Summary</h3>
        </div>
      </CardHeader>

      <CardContent className="divide-y">
        <div className="pb-4">
          <h4 className="font-medium text-gray-700 mb-2">
            Items ({items.length})
          </h4>
          <ul className="space-y-3">
            {items.map((item, index) => (
              <li key={index} className="flex items-start">
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  className="w-16 h-16 object-cover rounded-md mr-3"
                />
                <div className="flex-grow">
                  <h5 className="font-medium text-gray-800">
                    {item.product.name}
                  </h5>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Qty: {item.quantity}</span>
                    <span>
                      GH₵ {item.product.price.toFixed(2)} / {item.product.unit}
                    </span>
                  </div>
                  <div className="flex items-center mt-1">
                    <Badge variant="primary" className="text-xs">
                      {item.product.category}
                    </Badge>
                  </div>
                </div>
                <div className="text-right font-medium text-gray-800">
                  GH₵ {(item.product.price * item.quantity).toFixed(2)}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="py-4">
          <div className="flex items-start">
            <MapPin className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
            <div>
              <h4 className="font-medium text-gray-700 mb-1">
                Delivery Address
              </h4>
              <p className="text-gray-600">{deliveryAddress}</p>
            </div>
          </div>
        </div>

        <div className="py-4">
          <div className="flex items-start">
            <Truck className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
            <div>
              <h4 className="font-medium text-gray-700 mb-1">
                Delivery Method
              </h4>
              <p className="text-gray-600">
                Standard Delivery (2-3 business days)
              </p>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="bg-gray-50">
        <div className="w-full">
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-medium">GH₵ {subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Delivery Fee</span>
            <span className="font-medium">GH₵ {deliveryFee.toFixed(2)}</span>
          </div>
          <div className="flex justify-between pt-2 border-t">
            <span className="font-semibold text-gray-800">Total</span>
            <span className="font-bold text-green-600">
              GH₵ {total.toFixed(2)}
            </span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default OrderSummary;