import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, ShoppingBag, ChevronLeft, Star, MessageCircle } from 'lucide-react';
import { products, reviews } from '../data/mockData';
import Button from '../components/ui/Button';
import Card, { CardHeader, CardContent } from '../components/ui/Card';
import Rating from '../components/ui/Rating';
import Badge from '../components/ui/Badge';
import ReviewList from '../components/profile/ReviewList';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  
  const product = products.find(p => p.id === id);
  const productReviews = reviews.filter(r => r.farmerId === product?.farmerId);
  
  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
        <p className="text-gray-600 mb-6">The product you're looking for doesn't exist or has been removed.</p>
        <Link to="/marketplace">
          <Button>
            <ChevronLeft size={18} className="mr-1" />
            Back to Marketplace
          </Button>
        </Link>
      </div>
    );
  }

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value > 0 && value <= product.quantity) {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    // In a real app, this would add to cart
    console.log(`Added ${quantity} of ${product.name} to cart`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <Link to="/marketplace" className="text-green-600 hover:text-green-800 flex items-center">
          <ChevronLeft size={18} className="mr-1" />
          Back to Marketplace
        </Link>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Product Images */}
        <div>
          <div className="bg-white rounded-lg overflow-hidden shadow-md mb-4">
            <img
              src={product.images[activeImage]}
              alt={product.name}
              className="w-full h-96 object-cover"
            />
          </div>
          
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={`rounded-md overflow-hidden border-2 ${
                    activeImage === index ? 'border-green-500' : 'border-transparent'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-20 object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
        
        {/* Product Info */}
        <div>
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h1>
                <div className="flex items-center mb-2">
                  <Badge variant="primary" className="mr-2">
                    {product.category}
                  </Badge>
                  <div className="flex items-center text-gray-500 text-sm">
                    <MapPin size={14} className="mr-1" />
                    <span>{product.location}</span>
                  </div>
                </div>
              </div>
              <div className="text-2xl font-bold text-green-600">${product.price.toFixed(2)}</div>
            </div>
            
            <div className="border-t border-b py-4 my-4">
              <p className="text-gray-700">{product.description}</p>
            </div>
            
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-700">Availability:</span>
                <span className="font-medium text-gray-900">
                  {product.quantity} {product.unit} available
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Farmer:</span>
                <Link
                  to={`/profile/${product.farmerId}`}
                  className="flex items-center text-green-600 hover:text-green-800"
                >
                  <img
                    src={product.farmerAvatar}
                    alt={product.farmerName}
                    className="w-6 h-6 rounded-full object-cover mr-2"
                  />
                  <span>{product.farmerName}</span>
                </Link>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="w-24">
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                  Quantity
                </label>
                <input
                  type="number"
                  id="quantity"
                  min="1"
                  max={product.quantity}
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                />
              </div>
              
              <div className="flex-grow">
                <Button fullWidth onClick={handleAddToCart}>
                  <ShoppingBag size={18} className="mr-2" />
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
          
          {/* Farmer Card */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-gray-800">About the Farmer</h3>
            </CardHeader>
            <CardContent>
              <div className="flex items-start">
                <img
                  src={product.farmerAvatar}
                  alt={product.farmerName}
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">{product.farmerName}</h4>
                  <div className="flex items-center mb-2">
                    <Rating value={product.farmerRating} size="sm" />
                    <span className="ml-1 text-sm text-gray-600">
                      ({product.farmerRating.toFixed(1)})
                    </span>
                  </div>
                  <div className="flex items-center text-gray-600 text-sm mb-2">
                    <MapPin size={14} className="mr-1" />
                    <span>{product.location}</span>
                  </div>
                  <Link to={`/profile/${product.farmerId}`} className="text-green-600 hover:text-green-800 text-sm font-medium flex items-center">
                    View Profile
                    <MessageCircle size={14} className="ml-1" />
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Reviews Section */}
      <div className="mb-12">
        <ReviewList reviews={productReviews} title="Farmer Reviews" />
      </div>
      
      {/* Related Products */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products
            .filter(p => p.category === product.category && p.id !== product.id)
            .slice(0, 4)
            .map(relatedProduct => (
              <Link key={relatedProduct.id} to={`/product/${relatedProduct.id}`}>
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <img
                    src={relatedProduct.images[0]}
                    alt={relatedProduct.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-medium text-gray-900 mb-1">{relatedProduct.name}</h3>
                    <div className="flex justify-between items-center">
                      <span className="text-green-600 font-bold">${relatedProduct.price.toFixed(2)}</span>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                        <span className="text-sm text-gray-600 ml-1">{relatedProduct.farmerRating.toFixed(1)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;