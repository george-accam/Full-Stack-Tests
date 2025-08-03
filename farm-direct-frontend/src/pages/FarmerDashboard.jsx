import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  fetchFarmerProducts
} from "../services/productService";
import {
  fetchFarmerOrders
} from "../services/orderService";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

export default function FarmerDashboard() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsData, ordersData] = await Promise.all([
          fetchFarmerProducts(),
          fetchFarmerOrders(),
        ]);
        setProducts(productsData);
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
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-agri-green">
            Farmer Dashboard
          </h1>
          <Link
            to="/products/add"
            className="bg-agri-green text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
          >
            Add New Product
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Products Section */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Your Products</h2>
              <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                {products.length} items
              </span>
            </div>

            {products.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-600 mb-4">
                  You haven't added any products yet
                </p>
                <Link
                  to="/products/add"
                  className="inline-block bg-agri-green text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                >
                  Add Your First Product
                </Link>
              </div>
            ) : (
              <div className="divide-y">
                {products.slice(0, 5).map((product) => (
                  <div key={product._id} className="py-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">{product.name}</h3>
                        <p className="text-gray-600 text-sm">
                          {product.quantity} available • ${product.price}
                        </p>
                      </div>
                      <Link
                        to={`/products/${product._id}`}
                        className="text-agri-green hover:underline text-sm"
                      >
                        View
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {products.length > 5 && (
              <div className="mt-4 text-center">
                <Link
                  to="/products"
                  className="text-agri-green hover:underline"
                >
                  View all products &rarr;
                </Link>
              </div>
            )}
          </div>

          {/* Orders Section */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Recent Orders</h2>
              <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                {orders.length} orders
              </span>
            </div>

            {orders.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-600">You don't have any orders yet</p>
              </div>
            ) : (
              <div className="divide-y">
                {orders.slice(0, 5).map((order) => (
                  <div key={order._id} className="py-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">
                          Order #{order._id.slice(-6).toUpperCase()}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {order.items.reduce(
                            (sum, item) => sum + item.quantity,
                            0
                          )}{" "}
                          items • ${order.totalAmount.toFixed(2)}
                        </p>
                        <p className="text-gray-600 text-sm">
                          Customer: {order.customer?.name || "Unknown"}
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
                  </div>
                ))}
              </div>
            )}

            {orders.length > 5 && (
              <div className="mt-4 text-center">
                <Link to="/orders" className="text-agri-green hover:underline">
                  View all orders &rarr;
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
