import React, { useState } from 'react';
import { Upload, X, Plus } from 'lucide-react';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';
import { Product } from '../../types';

interface ProductFormProps {
  initialData?: Partial<Product>;
  onSubmit: (data: Partial<Product>) => void;
  isLoading?: boolean;
}

const ProductForm: React.FC<ProductFormProps> = ({
  initialData,
  onSubmit,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState<Partial<Product>>(
    initialData || {
      name: '',
      price: 0,
      description: '',
      quantity: 0,
      unit: 'kg',
      images: [],
      category: '',
      location: '',
    }
  );

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [imageUrls, setImageUrls] = useState<string[]>(initialData?.images || []);

  const handleChange = (name: string, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is updated
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleImageUrlAdd = () => {
    const url = prompt('Enter image URL:');
    if (url) {
      setImageUrls(prev => [...prev, url]);
      setFormData(prev => ({
        ...prev,
        images: [...(prev.images || []), url],
      }));
    }
  };

  const handleImageUrlRemove = (index: number) => {
    setImageUrls(prev => prev.filter((_, i) => i !== index));
    setFormData(prev => ({
      ...prev,
      images: (prev.images || []).filter((_, i) => i !== index),
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name) newErrors.name = 'Product name is required';
    if (!formData.price || formData.price <= 0) newErrors.price = 'Valid price is required';
    if (!formData.description) newErrors.description = 'Description is required';
    if (!formData.quantity || formData.quantity <= 0) newErrors.quantity = 'Valid quantity is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.location) newErrors.location = 'Location is required';
    if (!imageUrls.length) newErrors.images = 'At least one image is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const categoryOptions = [
    { value: '', label: 'Select Category' },
    { value: 'vegetables', label: 'Vegetables' },
    { value: 'fruits', label: 'Fruits' },
    { value: 'grains', label: 'Grains' },
    { value: 'tubers', label: 'Tubers' },
    { value: 'livestock', label: 'Livestock' },
    { value: 'dairy', label: 'Dairy' },
  ];

  const unitOptions = [
    { value: 'kg', label: 'Kilograms (kg)' },
    { value: 'g', label: 'Grams (g)' },
    { value: 'lb', label: 'Pounds (lb)' },
    { value: 'pieces', label: 'Pieces' },
    { value: 'bunches', label: 'Bunches' },
    { value: 'crates', label: 'Crates' },
    { value: 'sacks', label: 'Sacks' },
  ];

  const locationOptions = [
    { value: '', label: 'Select Location' },
    { value: 'Accra, Ghana', label: 'Accra, Ghana' },
    { value: 'Kumasi, Ghana', label: 'Kumasi, Ghana' },
    { value: 'Tamale, Ghana', label: 'Tamale, Ghana' },
    { value: 'Cape Coast, Ghana', label: 'Cape Coast, Ghana' },
    { value: 'Ho, Ghana', label: 'Ho, Ghana' },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Product Name"
        value={formData.name}
        onChange={(e) => handleChange('name', e.target.value)}
        error={errors.name}
        fullWidth
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Price ($)"
          type="number"
          step="0.01"
          min="0"
          value={formData.price}
          onChange={(e) => handleChange('price', parseFloat(e.target.value))}
          error={errors.price}
          fullWidth
        />
        
        <div className="grid grid-cols-2 gap-2">
          <Input
            label="Quantity"
            type="number"
            min="0"
            value={formData.quantity}
            onChange={(e) => handleChange('quantity', parseInt(e.target.value))}
            error={errors.quantity}
            fullWidth
          />
          
          <Select
            label="Unit"
            options={unitOptions}
            value={formData.unit}
            onChange={(value) => handleChange('unit', value)}
            fullWidth
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select
          label="Category"
          options={categoryOptions}
          value={formData.category}
          onChange={(value) => handleChange('category', value)}
          error={errors.category}
          fullWidth
        />
        
        <Select
          label="Location"
          options={locationOptions}
          value={formData.location}
          onChange={(value) => handleChange('location', value)}
          error={errors.location}
          fullWidth
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Product Images
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {imageUrls.map((url, index) => (
            <div key={index} className="relative group">
              <img
                src={url}
                alt={`Product ${index + 1}`}
                className="h-24 w-full object-cover rounded-md border border-gray-300"
              />
              <button
                type="button"
                onClick={() => handleImageUrlRemove(index)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X size={14} />
              </button>
            </div>
          ))}
          
          <button
            type="button"
            onClick={handleImageUrlAdd}
            className="h-24 w-full border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center text-gray-500 hover:text-gray-700 hover:border-gray-400 transition-colors"
          >
            <Plus size={24} />
            <span className="text-xs mt-1">Add Image</span>
          </button>
        </div>
        {errors.images && <p className="mt-1 text-sm text-red-600">{errors.images}</p>}
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => handleChange('description', e.target.value)}
          rows={4}
          className={`
            px-3 py-2 bg-white border shadow-sm border-gray-300 placeholder-gray-400 
            focus:outline-none focus:border-green-500 focus:ring-green-500 block w-full rounded-md sm:text-sm focus:ring-1
            ${errors.description ? 'border-red-500' : ''}
          `}
          placeholder="Describe your product in detail..."
        />
        {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
      </div>
      
      <Button type="submit" fullWidth isLoading={isLoading}>
        {initialData?.id ? 'Update Product' : 'Add Product'}
      </Button>
    </form>
  );
};

export default ProductForm;