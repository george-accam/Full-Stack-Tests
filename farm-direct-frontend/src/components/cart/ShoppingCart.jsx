// src/components/cart/ShoppingCart.jsx
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";

export default function ShoppingCart() {
  const { cartItems, removeFromCart, clearCart, total } =
    useContext(CartContext);

  const handleCheckout = () => {
    // Checkout logic
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-agri-green mb-6">
        Your Shopping Cart
      </h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="divide-y">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="py-4 flex justify-between items-center"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-gray-600">
                      ${item.price} x {item.quantity}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="mt-6 border-t pt-4">
            <div className="flex justify-between font-bold text-lg">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <div className="mt-6 flex gap-4">
              <button
                onClick={clearCart}
                className="px-4 py-2 border rounded hover:bg-gray-100"
              >
                Clear Cart
              </button>
              <button
                onClick={handleCheckout}
                className="px-4 py-2 bg-agri-green text-white rounded hover:bg-green-700 flex-1"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
