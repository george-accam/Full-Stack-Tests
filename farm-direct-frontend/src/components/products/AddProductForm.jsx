// src/components/products/AddProductForm.jsx
import { useState } from "react";

export default function AddProductForm() {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: 0,
    category: "vegetables",
    quantity: 1,
    expiryDate: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setProduct((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit logic
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-agri-green mb-6">
        Add New Product
      </h2>
      <form onSubmit={handleSubmit}>
        {/* Form fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Name, Price, Quantity fields */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Category</label>
            <select
              name="category"
              value={product.category}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="vegetables">Vegetables</option>
              <option value="fruits">Fruits</option>
              <option value="grains">Grains</option>
              <option value="dairy">Dairy</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-agri-green text-white py-2 px-4 rounded hover:bg-green-700"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}
