import React, { useState } from 'react';
import { Upload, Image, FileText } from 'lucide-react';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';

interface DiagnosisFormProps {
  onSubmit: (data: { cropName: string; description: string; imageUrl: string }) => void;
  isLoading?: boolean;
}

const DiagnosisForm: React.FC<DiagnosisFormProps> = ({ onSubmit, isLoading = false }) => {
  const [activeTab, setActiveTab] = useState<'image' | 'text'>('image');
  const [cropName, setCropName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleTabChange = (tab: 'image' | 'text') => {
    setActiveTab(tab);
    setErrors({});
  };

  const handleImageUrlAdd = () => {
    const url = prompt('Enter image URL:');
    if (url) {
      setImageUrl(url);
      if (errors.imageUrl) {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors.imageUrl;
          return newErrors;
        });
      }
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!cropName) newErrors.cropName = 'Crop name is required';
    
    if (activeTab === 'image') {
      if (!imageUrl) newErrors.imageUrl = 'Image is required';
    } else {
      if (!description) newErrors.description = 'Description is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit({
        cropName,
        description: activeTab === 'text' ? description : '',
        imageUrl: activeTab === 'image' ? imageUrl : '',
      });
    }
  };

  const cropOptions = [
    { value: '', label: 'Select Crop' },
    { value: 'tomato', label: 'Tomato' },
    { value: 'corn', label: 'Corn' },
    { value: 'cassava', label: 'Cassava' },
    { value: 'rice', label: 'Rice' },
    { value: 'cocoa', label: 'Cocoa' },
    { value: 'plantain', label: 'Plantain' },
    { value: 'yam', label: 'Yam' },
    { value: 'pepper', label: 'Pepper' },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex mb-6 border-b">
        <button
          type="button"
          className={`flex items-center px-4 py-2 font-medium text-sm border-b-2 ${
            activeTab === 'image'
              ? 'border-green-500 text-green-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
          onClick={() => handleTabChange('image')}
        >
          <Image size={18} className="mr-2" />
          Upload Image
        </button>
        <button
          type="button"
          className={`flex items-center px-4 py-2 font-medium text-sm border-b-2 ${
            activeTab === 'text'
              ? 'border-green-500 text-green-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
          onClick={() => handleTabChange('text')}
        >
          <FileText size={18} className="mr-2" />
          Describe Symptoms
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Select
          label="Crop Type"
          options={cropOptions}
          value={cropName}
          onChange={(value) => setCropName(value)}
          error={errors.cropName}
          fullWidth
        />
        
        {activeTab === 'image' ? (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Upload Crop Image
            </label>
            {imageUrl ? (
              <div className="relative mb-2">
                <img
                  src={imageUrl}
                  alt="Crop"
                  className="h-48 w-full object-cover rounded-md border border-gray-300"
                />
                <button
                  type="button"
                  onClick={() => setImageUrl('')}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                >
                  <Upload size={14} />
                </button>
              </div>
            ) : (
              <div
                onClick={handleImageUrlAdd}
                className="h-48 w-full border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center text-gray-500 hover:text-gray-700 hover:border-gray-400 transition-colors cursor-pointer"
              >
                <Upload size={32} />
                <p className="mt-2 text-sm">Click to add an image URL</p>
                <p className="text-xs text-gray-500">
                  For best results, use a clear image of the affected area
                </p>
              </div>
            )}
            {errors.imageUrl && <p className="mt-1 text-sm text-red-600">{errors.imageUrl}</p>}
          </div>
        ) : (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Describe the Symptoms
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={6}
              className={`
                px-3 py-2 bg-white border shadow-sm border-gray-300 placeholder-gray-400 
                focus:outline-none focus:border-green-500 focus:ring-green-500 block w-full rounded-md sm:text-sm focus:ring-1
                ${errors.description ? 'border-red-500' : ''}
              `}
              placeholder="Describe the symptoms you're seeing on your crop in detail. Include information about when you first noticed the issue, what parts of the plant are affected, and any environmental factors that might be relevant."
            />
            {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
          </div>
        )}
        
        <Button type="submit" fullWidth isLoading={isLoading}>
          Get Diagnosis
        </Button>
      </form>
    </div>
  );
};

export default DiagnosisForm;