import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CardContext";
import { createOrder } from "../services/orderService";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

export default function Cart() {
  const { cartItems, removeFromCart, clearCart, cartTotal, updateQuantity } =
    useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    if (!user) {
      toast.info("Please login to proceed to checkout");
      navigate("/login", { state: { from: "/cart" } });
      return;
    }

    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    setLoading(true);

    try {
      const orderData = {
        items: cartItems.map((item) => ({
          product: item.id,
          quantity: item.quantity,
        })),
        shippingAddress: user.address || "",
        paymentMethod: "Cash on Delivery", // Default for now
      };

      await createOrder(orderData);
      clearCart();
      toast.success("Order placed successfully!");
      navigate("/customer-dashboard");
    } catch (error) {
      toast.error("Failed to place order");
      console.error("Checkout error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-agri-light py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-agri-green mb-8">
          Your Shopping Cart
        </h1>

        {cartItems.length === 0 ? (
          <div className="bg-white p-8 rounded-lg shadow-sm text-center">
            <p className="text-gray-600 mb-4">Your cart is empty</p>
            <Link
              to="/products"
              className="inline-block bg-agri-green text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="divide-y">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="p-4 flex justify-between items-center"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-gray-600">${item.price.toFixed(2)}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <input
                      type="number"
                      min="1"
                      max={item.maxQuantity}
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(item.id, parseInt(e.target.value) || 1)
                      }
                      className="w-16 p-2 border rounded text-center"
                    />
                    <p className="font-medium w-20 text-right">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 border-t">
              <div className="flex justify-between font-bold text-lg mb-6">
                <span>Total:</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={clearCart}
                  className="flex-1 py-3 px-4 border rounded-lg hover:bg-gray-100 transition"
                >
                  Clear Cart
                </button>
                <button
                  onClick={handleCheckout}
                  disabled={loading}
                  className={`flex-1 py-3 px-4 bg-agri-green text-white rounded-lg hover:bg-green-700 transition ${
                    loading ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {loading ? "Processing..." : "Proceed to Checkout"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
