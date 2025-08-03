import React, { useState, useEffect } from 'react';
import { Filter, Plus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { products } from '../data/mockData';
import ProductCard from '../components/marketplace/ProductCard';
import FilterSidebar, { FilterValues } from '../components/marketplace/FilterSidebar';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import ProductForm from '../components/marketplace/ProductForm';

const MarketplacePage: React.FC = () => {
  const { user } = useAuth();
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isProductFormOpen, setIsProductFormOpen] = useState(false);
  const [filters, setFilters] = useState<FilterValues>({
    search: '',
    category: '',
    minPrice: '',
    maxPrice: '',
    location: '',
  });
  const [cartItems, setCartItems] = useState<{ product: typeof products[0]; quantity: number }[]>([]);

  const isFarmer = user?.role === 'farmer';

  useEffect(() => {
    applyFilters(filters);
  }, []);

  const applyFilters = (filterValues: FilterValues) => {
    setFilters(filterValues);
    
    let filtered = [...products];
    
    if (filterValues.search) {
      const searchTerm = filterValues.search.toLowerCase();
      filtered = filtered.filter(
        product =>
          product.name.toLowerCase().includes(searchTerm) ||
          product.description.toLowerCase().includes(searchTerm)
      );
    }
    
    if (filterValues.category) {
      filtered = filtered.filter(product => product.category === filterValues.category);
    }
    
    if (filterValues.minPrice) {
      filtered = filtered.filter(
        product => product.price >= parseFloat(filterValues.minPrice)
      );
    }
    
    if (filterValues.maxPrice) {
      filtered = filtered.filter(
        product => product.price <= parseFloat(filterValues.maxPrice)
      );
    }
    
    if (filterValues.location) {
      filtered = filtered.filter(product =>
        product.location.toLowerCase().includes(filterValues.location.toLowerCase())
      );
    }
    
    setFilteredProducts(filtered);
  };

  const handleAddToCart = (product: typeof products[0]) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.product.id === product.id);
      
      if (existingItem) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { product, quantity: 1 }];
      }
    });
  };

  const handleAddProduct = (productData: Partial<typeof products[0]>) => {
    // In a real app, this would send data to an API
    console.log('Adding product:', productData);
    setIsProductFormOpen(false);
    // Would then refresh products from API
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Marketplace</h1>
          <p className="text-gray-600">
            {filteredProducts.length} products available
          </p>
        </div>
        
        <div className="flex mt-4 md:mt-0 space-x-2">
          <Button
            variant="outline"
            onClick={() => setIsFilterModalOpen(true)}
            className="md:hidden"
          >
            <Filter size={18} className="mr-1" />
            Filters
          </Button>
          
          {isFarmer && (
            <Button onClick={() => setIsProductFormOpen(true)}>
              <Plus size={18} className="mr-1" />
              Add Product
            </Button>
          )}
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar - Desktop */}
        <div className="hidden md:block w-64 flex-shrink-0">
          <FilterSidebar onFilter={applyFilters} />
        </div>
        
        {/* Product Grid */}
        <div className="flex-grow">
          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-600">
                Try adjusting your filters or search criteria.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* Filter Modal - Mobile */}
      <Modal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        title="Filters"
      >
        <FilterSidebar
          onFilter={(filterValues) => {
            applyFilters(filterValues);
            setIsFilterModalOpen(false);
          }}
          isMobile
          onClose={() => setIsFilterModalOpen(false)}
        />
      </Modal>
      
      {/* Add Product Modal */}
      <Modal
        isOpen={isProductFormOpen}
        onClose={() => setIsProductFormOpen(false)}
        title="Add New Product"
        size="lg"
      >
        <ProductForm onSubmit={handleAddProduct} />
      </Modal>
    </div>
  );
};

export default MarketplacePage;