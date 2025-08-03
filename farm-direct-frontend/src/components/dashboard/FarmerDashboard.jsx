// src/components/dashboard/FarmerDashboard.jsx
import { useState, useEffect } from "react";
import {
  getFarmerProducts,
  getFarmerOrders,
} from "../../services/farmerService";

export default function FarmerDashboard() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsData, ordersData] = await Promise.all([
          getFarmerProducts(),
          getFarmerOrders(),
        ]);
        setProducts(productsData);
        setOrders(ordersData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-agri-green mb-8">
        Farmer Dashboard
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Your Products</h2>
          {products.length === 0 ? (
            <p>No products added yet</p>
          ) : (
            <ul className="divide-y">
              {products.map((product) => (
                <li key={product.id} className="py-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">{product.name}</h3>
                      <p className="text-sm text-gray-600">
                        {product.quantity} available - ${product.price}
                      </p>
                    </div>
                    <span className="px-2 py-1 bg-agri-green text-white text-xs rounded-full">
                      {product.category}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
          <button className="mt-4 px-4 py-2 bg-agri-green text-white rounded hover:bg-green-700">
            Add New Product
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
          {orders.length === 0 ? (
            <p>No orders yet</p>
          ) : (
            <ul className="divide-y">
              {orders.map((order) => (
                <li key={order.id} className="py-3">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-medium">Order #{order.id}</h3>
                      <p className="text-sm text-gray-600">
                        {order.items.length} items - ${order.total}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        order.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : order.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
