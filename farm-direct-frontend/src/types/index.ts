export type UserRole = 'farmer' | 'buyer';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  location: string;
  phone: string;
  avatar: string;
  bio: string;
  rating: number;
  joinedDate: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  quantity: number;
  unit: string;
  images: string[];
  category: string;
  farmerId: string;
  farmerName: string;
  farmerAvatar: string;
  farmerRating: number;
  location: string;
  createdAt: string;
}

export interface Review {
  id: string;
  farmerId: string;
  buyerId: string;
  buyerName: string;
  buyerAvatar: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Order {
  id: string;
  buyerId: string;
  farmerId: string;
  products: {
    productId: string;
    name: string;
    price: number;
    quantity: number;
    total: number;
  }[];
  totalAmount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentMethod: 'momo' | 'card' | 'bank';
  paymentStatus: 'pending' | 'completed' | 'failed';
  deliveryAddress: string;
  createdAt: string;
}

export interface DiagnosisResult {
  id: string;
  farmerId: string;
  cropName: string;
  condition: string;
  severity: 'low' | 'medium' | 'high';
  diagnosis: string;
  recommendations: string[];
  createdAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  read: boolean;
  type: 'order' | 'payment' | 'diagnosis' | 'message';
  createdAt: string;
}