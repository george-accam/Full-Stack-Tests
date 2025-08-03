import React, { useState } from 'react';
import { Filter, X } from 'lucide-react';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';

interface FilterSidebarProps {
  onFilter: (filters: FilterValues) => void;
  isMobile?: boolean;
  onClose?: () => void;
}

export interface FilterValues {
  search: string;
  category: string;
  minPrice: string;
  maxPrice: string;
  location: string;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ 
  onFilter, 
  isMobile = false,
  onClose
}) => {
  const [filters, setFilters] = useState<FilterValues>({
    search: '',
    category: '',
    minPrice: '',
    maxPrice: '',
    location: '',
  });

  const handleChange = (name: keyof FilterValues, value: string) => {
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilter(filters);
    if (isMobile && onClose) {
      onClose();
    }
  };

  const handleReset = () => {
    const resetFilters = {
      search: '',
      category: '',
      minPrice: '',
      maxPrice: '',
      location: '',
    };
    setFilters(resetFilters);
    onFilter(resetFilters);
  };

  const categoryOptions = [
    { value: '', label: 'All Categories' },
    { value: 'vegetables', label: 'Vegetables' },
    { value: 'fruits', label: 'Fruits' },
    { value: 'grains', label: 'Grains' },
    { value: 'tubers', label: 'Tubers' },
    { value: 'livestock', label: 'Livestock' },
    { value: 'dairy', label: 'Dairy' },
  ];

  const locationOptions = [
    { value: '', label: 'All Locations' },
    { value: 'Accra', label: 'Accra' },
    { value: 'Kumasi', label: 'Kumasi' },
    { value: 'Tamale', label: 'Tamale' },
    { value: 'Cape Coast', label: 'Cape Coast' },
    { value: 'Ho', label: 'Ho' },
  ];

  return (
    <div className={`bg-white p-4 rounded-lg shadow-md ${isMobile ? 'w-full' : ''}`}>
      {isMobile && (
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium flex items-center">
            <Filter size={18} className="mr-2" />
            Filters
          </h3>
          {onClose && (
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>
          )}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <Input
          label="Search"
          placeholder="Search products..."
          value={filters.search}
          onChange={(e) => handleChange('search', e.target.value)}
          fullWidth
        />
        
        <Select
          label="Category"
          options={categoryOptions}
          value={filters.category}
          onChange={(value) => handleChange('category', value)}
          fullWidth
        />
        
        <div className="grid grid-cols-2 gap-2">
          <Input
            label="Min Price"
            type="number"
            placeholder="0"
            value={filters.minPrice}
            onChange={(e) => handleChange('minPrice', e.target.value)}
            fullWidth
          />
          
          <Input
            label="Max Price"
            type="number"
            placeholder="1000"
            value={filters.maxPrice}
            onChange={(e) => handleChange('maxPrice', e.target.value)}
            fullWidth
          />
        </div>
        
        <Select
          label="Location"
          options={locationOptions}
          value={filters.location}
          onChange={(value) => handleChange('location', value)}
          fullWidth
        />
        
        <div className="flex space-x-2 mt-4">
          <Button type="submit" fullWidth>
            Apply Filters
          </Button>
          
          <Button 
            type="button" 
            variant="outline" 
            onClick={handleReset}
            fullWidth
          >
            Reset
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FilterSidebar;