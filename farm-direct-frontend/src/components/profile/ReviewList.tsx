import React from 'react';
import Card, { CardHeader, CardContent } from '../ui/Card';
import Rating from '../ui/Rating';
import { Review } from '../../types';

interface ReviewListProps {
  reviews: Review[];
  title?: string;
}

const ReviewList: React.FC<ReviewListProps> = ({
  reviews,
  title = 'Reviews',
}) => {
  if (reviews.length === 0) {
    return (
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500 text-center py-4">No reviews yet.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="border-b pb-4 last:border-b-0 last:pb-0">
              <div className="flex items-start">
                <img
                  src={review.buyerAvatar}
                  alt={review.buyerName}
                  className="w-10 h-10 rounded-full object-cover mr-3"
                />
                <div className="flex-grow">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium text-gray-800">{review.buyerName}</h4>
                    <span className="text-sm text-gray-500">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <Rating value={review.rating} size="sm" className="my-1" />
                  <p className="text-gray-600 mt-1">{review.comment}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ReviewList;