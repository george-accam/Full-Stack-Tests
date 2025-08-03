import { Link } from "react-router-dom";
import { useCart } from "../../context/CardContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart({
      id: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
      farmer: product.farmer,
      maxQuantity: product.quantity,
    });
  };

  return (
    <Link
      to={`/products/${product._id}`}
      className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition"
    >
      <div className="relative pb-[75%]">
        <img
          src={product.image}
          alt={product.name}
          className="absolute h-full w-full object-cover"
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-medium text-lg">{product.name}</h3>
          <span className="bg-agri-green text-white px-2 py-1 rounded-full text-xs">
            {product.category}
          </span>
        </div>
        <p className="text-agri-green font-semibold mb-2">
          ${product.price.toFixed(2)}
        </p>
        <p className="text-gray-600 text-sm mb-3">
          {product.quantity} available
        </p>
        <button
          onClick={handleAddToCart}
          className="w-full bg-agri-green text-white py-2 rounded hover:bg-green-700 transition"
        >
          Add to Cart
        </button>
      </div>
    </Link>
  );
}
