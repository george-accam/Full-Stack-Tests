import React from 'react';
import { Star } from 'lucide-react';

interface RatingProps {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  readOnly?: boolean;
  onChange?: (value: number) => void;
  className?: string;
}

const Rating: React.FC<RatingProps> = ({
  value,
  max = 5,
  size = 'md',
  readOnly = true,
  onChange,
  className = '',
}) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  };

  const handleClick = (rating: number) => {
    if (!readOnly && onChange) {
      onChange(rating);
    }
  };

  return (
    <div className={`flex items-center ${className}`}>
      {[...Array(max)].map((_, index) => {
        const starValue = index + 1;
        return (
          <button
            key={index}
            type="button"
            onClick={() => handleClick(starValue)}
            className={`
              ${readOnly ? 'cursor-default' : 'cursor-pointer'}
              p-0 mr-1 focus:outline-none
            `}
            disabled={readOnly}
          >
            <Star
              className={`
                ${sizeClasses[size]}
                ${
                  starValue <= value
                    ? 'text-yellow-400 fill-yellow-400'
                    : 'text-gray-300'
                }
                transition-colors duration-200
              `}
            />
          </button>
        );
      })}
    </div>
  );
};

export default Rating;