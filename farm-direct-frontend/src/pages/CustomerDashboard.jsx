import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchCustomerOrders } from "../services/orderService";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

export default function CustomerDashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ordersData = await fetchCustomerOrders();
        setOrders(ordersData);
      } catch (error) {
        toast.error("Failed to load dashboard data");
        console.error("Dashboard error:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchData();
    }
  }, [user]);

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

  return (
    <div className="min-h-screen bg-agri-light py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-agri-green mb-8">
          Customer Dashboard
        </h1>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Your Orders</h2>
            <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
              {orders.length} orders
            </span>
          </div>

          {orders.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600 mb-4">
                You haven't placed any orders yet
              </p>
              <Link
                to="/products"
                className="inline-block bg-agri-green text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
              >
                Browse Products
              </Link>
            </div>
          ) : (
            <div className="divide-y">
              {orders.map((order) => (
                <div key={order._id} className="py-4">
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <h3 className="font-medium">
                        Order #{order._id.slice(-6).toUpperCase()}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                      <p className="text-gray-600 text-sm">
                        Farmer: {order.farmer?.name || "Unknown"}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${
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

                  <div className="flex justify-between items-center mt-2">
                    <p className="text-gray-600">
                      {order.items.length} items • Total: $
                      {order.totalAmount.toFixed(2)}
                    </p>
                    <Link
                      to={`/orders/${order._id}`}
                      className="text-agri-green hover:underline text-sm"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
