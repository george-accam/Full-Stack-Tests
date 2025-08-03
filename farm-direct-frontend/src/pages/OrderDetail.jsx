import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { fetchOrderById } from "../services/orderService";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

export default function OrderDetail() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const getOrder = async () => {
      try {
        const orderData = await fetchOrderById(id);

        // Check if the user is authorized to view this order
        if (
          user._id !== orderData.customer?._id &&
          user._id !== orderData.farmer?._id
        ) {
          toast.error("Not authorized to view this order");
          navigate("/");
          return;
        }

        setOrder(orderData);
      } catch (error) {
        toast.error("Failed to load order details");
        console.error("Order error:", error);
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    getOrder();
  }, [id, user, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-agri-light py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-agri-green"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-agri-light py-12">
        <div className="container mx-auto px-4">
          <p className="text-center text-gray-600">Order not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-agri-light py-12">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md overflow-hidden p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Order #{order._id.slice(-6).toUpperCase()}
              </h1>
              <p className="text-gray-600">
                Placed on {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-sm ${
                order.status === "pending"
                  ? "bg-yellow-100 text-yellow-800"
                  : order.status === "processing"
                  ? "bg-blue-100 text-blue-800"
                  : order.status === "delivered"
                  ? "bg-green-100 text-green-800"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {order.status}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h2 className="text-lg font-semibold mb-2">Customer Details</h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-medium">
                  {order.customer?.name || "Unknown"}
                </p>
                <p className="text-gray-600">{order.shippingAddress}</p>
                <p className="text-gray-600">{order.customer?.email || ""}</p>
                <p className="text-gray-600">{order.customer?.phone || ""}</p>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-2">Farmer Details</h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-medium">{order.farmer?.name || "Unknown"}</p>
                <p className="text-gray-600">{order.farmer?.email || ""}</p>
                <p className="text-gray-600">{order.farmer?.phone || ""}</p>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Order Items</h2>
            <div className="divide-y">
              {order.items.map((item, index) => (
                <div
                  key={index}
                  className="py-4 flex justify-between items-center"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.product?.image}
                      alt={item.product?.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div>
                      <h3 className="font-medium">
                        {item.product?.name || "Product"}
                      </h3>
                      <p className="text-gray-600">
                        ${item.priceAtPurchase.toFixed(2)} × {item.quantity}
                      </p>
                    </div>
                  </div>
                  <p className="font-medium">
                    ${(item.priceAtPurchase * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between font-bold text-lg mb-4">
              <span>Total Amount:</span>
              <span>${order.totalAmount.toFixed(2)}</span>
            </div>

            <div className="mb-4">
              <h2 className="text-lg font-semibold mb-2">Payment Method</h2>
              <p className="text-gray-600">{order.paymentMethod}</p>
            </div>

            <div className="flex justify-end">
              <Link
                to={
                  user.role === "farmer"
                    ? "/farmer-dashboard"
                    : "/customer-dashboard"
                }
                className="bg-agri-green text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
              >
                Back to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
