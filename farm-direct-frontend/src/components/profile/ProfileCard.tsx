import React from 'react';
import { MapPin, Phone, Mail, Calendar, Star } from 'lucide-react';
import Card, { CardHeader, CardContent } from '../ui/Card';
import Button from '../ui/Button';
import Rating from '../ui/Rating';
import { User } from '../../types';

interface ProfileCardProps {
  user: User;
  isOwnProfile?: boolean;
  onEditProfile?: () => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  user,
  isOwnProfile = false,
  onEditProfile,
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-col items-center text-center bg-green-50 pb-0">
        <div className="relative -mt-12">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-24 h-24 rounded-full border-4 border-white object-cover shadow-md"
          />
          <div className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-md">
            <div className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              {user.role === 'farmer' ? 'Farmer' : 'Buyer'}
            </div>
          </div>
        </div>
        
        <h2 className="mt-2 text-xl font-bold text-gray-800">{user.name}</h2>
        
        {user.rating > 0 && (
          <div className="flex items-center mt-1">
            <Rating value={user.rating} size="sm" />
            <span className="ml-1 text-sm text-gray-600">({user.rating.toFixed(1)})</span>
          </div>
        )}
      </CardHeader>
      
      <CardContent>
        <div className="space-y-3 mb-4">
          <div className="flex items-center text-gray-600">
            <MapPin size={18} className="mr-2 text-gray-500" />
            <span>{user.location}</span>
          </div>
          
          <div className="flex items-center text-gray-600">
            <Phone size={18} className="mr-2 text-gray-500" />
            <span>{user.phone}</span>
          </div>
          
          <div className="flex items-center text-gray-600">
            <Mail size={18} className="mr-2 text-gray-500" />
            <span>{user.email}</span>
          </div>
          
          <div className="flex items-center text-gray-600">
            <Calendar size={18} className="mr-2 text-gray-500" />
            <span>Joined {new Date(user.joinedDate).toLocaleDateString()}</span>
          </div>
        </div>
        
        {user.bio && (
          <div className="mt-4">
            <h3 className="text-md font-semibold text-gray-700 mb-2">About</h3>
            <p className="text-gray-600">{user.bio}</p>
          </div>
        )}
        
        {isOwnProfile && onEditProfile && (
          <div className="mt-4">
            <Button variant="outline" fullWidth onClick={onEditProfile}>
              Edit Profile
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProfileCard;