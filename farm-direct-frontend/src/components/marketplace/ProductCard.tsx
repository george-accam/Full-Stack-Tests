import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ShoppingCart } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Rating from '../ui/Rating';
import { Product } from '../../types';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(product);
    }
  };

  return (
    <Card hover className="h-full flex flex-col">
      <div className="relative">
        <img 
          src={product.images[0]} 
          alt={product.name} 
          className="w-full h-48 object-cover rounded-t-lg"
        />
        <div className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md">
          <Rating value={product.farmerRating} size="sm" />
        </div>
      </div>
      
      <div className="p-4 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-800 hover:text-green-600 transition-colors">
            <Link to={`/product/${product.id}`}>{product.name}</Link>
          </h3>
          <span className="font-bold text-green-600">GH₵ {product.price.toFixed(2)}</span>
        </div>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
        
        <div className="flex items-center text-gray-500 text-sm mb-2">
          <MapPin size={14} className="mr-1" />
          <span>{product.location}</span>
        </div>
        
        <div className="flex items-center mt-auto pt-3 border-t">
          <div className="flex items-center">
            <img 
              src={product.farmerAvatar} 
              alt={product.farmerName} 
              className="w-8 h-8 rounded-full object-cover mr-2"
            />
            <span className="text-sm font-medium">{product.farmerName}</span>
          </div>
          
          <Button 
            variant="primary" 
            size="sm" 
            className="ml-auto"
            onClick={handleAddToCart}
          >
            <ShoppingCart size={16} className="mr-1" />
            Add
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;