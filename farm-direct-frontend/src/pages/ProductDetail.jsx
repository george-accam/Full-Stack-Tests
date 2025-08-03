import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { fetchProductById } from "../services/productService";
import { useCart } from "../context/CardContext";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { isFarmer } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const data = await fetchProductById(id);
        setProduct(data);
      } catch (error) {
        toast.error("Failed to load product details");
        console.error("Error fetching product:", error);
        navigate("/products");
      } finally {
        setLoading(false);
      }
    };
    
    getProduct();
  }, [id, navigate]);

  const handleAddToCart = () => {
    if (quantity > product.quantity) {
      toast.error(`Only ${product.quantity} available`);
      return;
    }
    
    addToCart({
      id: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity,
      farmer: product.farmer,
      maxQuantity: product.quantity,
    });
    
    toast.success("Added to cart!");
  };

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

  if (!product) {
    return (
      <div className="min-h-screen bg-agri-light py-12">
        <div className="container mx-auto px-4">
          <p className="text-center text-gray-600">Product not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-agri-light py-12">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2 p-6">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-96 object-cover rounded-lg"
              />
            </div>
            
            <div className="md:w-1/2 p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
                  <p className="text-agri-green text-xl font-semibold mt-2">
                    ${product.price.toFixed(2)}
                  </p>
                </div>
                <span className="bg-agri-green text-white px-3 py-1 rounded-full text-sm">
                  {product.category}
                </span>
              </div>
              
              <div className="mt-6">
                <h2 className="text-lg font-semibold">Description</h2>
                <p className="text-gray-600 mt-2">{product.description}</p>
              </div>
              
              <div className="mt-6">
                <h2 className="text-lg font-semibold">Farmer Details</h2>
                <p className="text-gray-600 mt-2">
                  {product.farmer?.name || "Unknown Farmer"}
                </p>
              </div>
              
              <div className="mt-6">
                <h2 className="text-lg font-semibold">Availability</h2>
                <p className="text-gray-600 mt-2">
                  {product.quantity > 0 
                    ? `${product.quantity} units available` 
                    : "Out of stock"}
                </p>
                <p className="text-gray-600">
                  Harvest/Expiry: {new Date(product.expiryDate).toLocaleDateString()}
                </p>
              </div>
              
              {product.quantity > 0 && !isFarmer && (
                <div className="mt-8">
                  <div className="flex items-center mb-4">
                    <label htmlFor="quantity" className="mr-4">
                      Quantity:
                    </label>
                    <input
                      type="number"
                      id="quantity"
                      min="1"
                      max={product.quantity}
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, Math.min(product.quantity, parseInt(e.target.value) || 1)))}
                      className="w-20 p-2 border rounded"
                    />
                  </div>
                  
                  <button
                    onClick={handleAddToCart}
                    className="w-full bg-agri-green text-white py-3 px-4 rounded-lg hover:bg-green-700 transition"
                  >
                    Add to Cart
                  </button>
                </div>
              )}
              
              {isFarmer && (
                <div className="mt-8 flex gap-4">
                  <Link
                    to={`/products/edit/${product._id}`}
                    className="flex-1 bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition text-center"
                  >
                    Edit Product
                  </Link>
                  <button
                    onClick={() => navigate(-1)}
                    className="flex-1 bg-gray-500 text-white py-3 px-4 rounded-lg hover:bg-gray-600 transition"
                  >
                    Back to Products
                  </button>
                </div>
              )}
              
              <div className="mt-6">
                <Link 
                  to="/products" 
                  className="text-agri-green hover:underline"
                >
                  &larr; Back to Products
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}