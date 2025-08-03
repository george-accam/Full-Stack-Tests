import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import ProductCard from "../components/products/ProductCard";
import { fetchProducts } from "../services/productService";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const { isFarmer } = useAuth();

  const category = searchParams.get("category") || "";
  const search = searchParams.get("search") || "";
  const minPrice = searchParams.get("minPrice") || "";
  const maxPrice = searchParams.get("maxPrice") || "";

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchProducts({
          category,
          search,
          minPrice,
          maxPrice,
        });
        setProducts(data);
      } catch (error) {
        toast.error("Failed to load products");
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, [category, search, minPrice, maxPrice]);

  const handleFilterChange = (key, value) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    setSearchParams(params);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-green-600">
            {category
              ? `${category.charAt(0).toUpperCase() + category.slice(1)}`
              : "All Products"}
          </h1>
          {isFarmer && (
            <Link
              to="/products/add"
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
            >
              Add Product
            </Link>
          )}
        </div>

        <div className="mb-8 bg-white p-4 rounded-lg shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-gray-700 mb-2">Search</label>
              <input
                type="text"
                placeholder="Product name..."
                value={search}
                onChange={(e) => handleFilterChange("search", e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Category</label>
              <select
                value={category}
                onChange={(e) => handleFilterChange("category", e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="">All Categories</option>
                <option value="vegetables">Vegetables</option>
                <option value="fruits">Fruits</option>
                <option value="grains">Grains</option>
                <option value="dairy">Dairy</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Min Price</label>
              <input
                type="number"
                placeholder="Min"
                value={minPrice}
                onChange={(e) => handleFilterChange("minPrice", e.target.value)}
                className="w-full p-2 border rounded"
                min="0"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Max Price</label>
              <input
                type="number"
                placeholder="Max"
                value={maxPrice}
                onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
                className="w-full p-2 border rounded"
                min="0"
              />
            </div>
          </div>
        </div>

        {products.length === 0 ? (
          <div className="bg-white p-8 rounded-lg shadow-sm text-center">
            <p className="text-gray-600">
              No products found matching your criteria.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
