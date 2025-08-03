import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createProduct,
  updateProduct,
  fetchProductById,
} from "../services/productService";
import { toast } from "react-toastify";

export default function AddEditProduct() {
  const { id } = useParams();
  const isEditing = !!id;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "vegetables",
    quantity: "",
    expiryDate: "",
    image: null,
    previewImage: "",
  });

  const [loading, setLoading] = useState(false);
  const [imageError, setImageError] = useState("");

  useEffect(() => {
    if (isEditing) {
      const getProduct = async () => {
        try {
          const product = await fetchProductById(id);
          setFormData({
            name: product.name,
            description: product.description,
            price: product.price.toString(),
            category: product.category,
            quantity: product.quantity.toString(),
            expiryDate: new Date(product.expiryDate)
              .toISOString()
              .split("T")[0],
            image: null,
            previewImage: product.image,
          });
        } catch (error) {
          toast.error("Failed to load product");
          console.error("Error fetching product:", error);
          navigate("/products");
        }
      };

      getProduct();
    }
  }, [id, isEditing, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      if (!file.type.match("image.*")) {
        setImageError("Please select an image file");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setImageError("Image size should be less than 5MB");
        return;
      }

      setImageError("");
      setFormData((prev) => ({
        ...prev,
        image: file,
        previewImage: URL.createObjectURL(file),
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const productData = {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        category: formData.category,
        quantity: parseInt(formData.quantity),
        expiryDate: formData.expiryDate,
        image: formData.image,
      };

      if (isEditing) {
        await updateProduct(id, productData);
        toast.success("Product updated successfully!");
      } else {
        await createProduct(productData);
        toast.success("Product added successfully!");
      }

      navigate("/products");
    } catch (error) {
      toast.error(
        isEditing ? "Failed to update product" : "Failed to add product"
      );
      console.error("Product error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-agri-light py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
          <h1 className="text-2xl font-bold text-agri-green mb-6">
            {isEditing ? "Edit Product" : "Add New Product"}
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-gray-700 mb-2">
                Product Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-agri-green focus:border-transparent"
                required
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-gray-700 mb-2">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-agri-green focus:border-transparent"
                rows="4"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="price" className="block text-gray-700 mb-2">
                  Price ($)
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-agri-green focus:border-transparent"
                  min="0"
                  step="0.01"
                  required
                />
              </div>

              <div>
                <label htmlFor="quantity" className="block text-gray-700 mb-2">
                  Quantity
                </label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-agri-green focus:border-transparent"
                  min="1"
                  required
                />
              </div>

              <div>
                <label htmlFor="category" className="block text-gray-700 mb-2">
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-agri-green focus:border-transparent"
                  required
                >
                  <option value="vegetables">Vegetables</option>
                  <option value="fruits">Fruits</option>
                  <option value="grains">Grains</option>
                  <option value="dairy">Dairy</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="expiryDate" className="block text-gray-700 mb-2">
                Harvest/Expiry Date
              </label>
              <input
                type="date"
                id="expiryDate"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-agri-green focus:border-transparent"
                required
              />
            </div>

            <div>
              <label htmlFor="image" className="block text-gray-700 mb-2">
                Product Image
              </label>
              {formData.previewImage && (
                <div className="mb-4">
                  <img
                    src={formData.previewImage}
                    alt="Preview"
                    className="w-32 h-32 object-cover rounded-lg"
                  />
                </div>
              )}
              <input
                type="file"
                id="image"
                name="image"
                onChange={handleImageChange}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-agri-green focus:border-transparent"
                accept="image/*"
                required={!isEditing}
              />
              {imageError && (
                <p className="text-red-500 text-sm mt-1">{imageError}</p>
              )}
            </div>

            <div className="flex justify-end gap-4 pt-4">
              <button
                type="button"
                onClick={() => navigate("/products")}
                className="px-4 py-2 border rounded-lg hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className={`px-4 py-2 bg-agri-green text-white rounded-lg hover:bg-green-700 transition ${
                  loading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {loading
                  ? isEditing
                    ? "Updating..."
                    : "Adding..."
                  : isEditing
                  ? "Update Product"
                  : "Add Product"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
