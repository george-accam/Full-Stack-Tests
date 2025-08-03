import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (
    name: string,
    email: string,
    password: string,
    role: UserRole
  ) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data for demonstration
const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Farmer',
    email: 'john@farm.com',
    role: 'farmer',
    location: 'Kumasi, Ghana',
    phone: '+233 20 123 4567',
    avatar: 'https://images.unsplash.com/photo-1560787313-5dff3307e257?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80',
    bio: 'Growing organic vegetables for over 10 years. Specializing in tomatoes and peppers.',
    rating: 4.8,
    joinedDate: '2020-05-15',
  },
  {
    id: '2',
    name: 'Sarah Buyer',
    email: 'sarah@buyer.com',
    role: 'buyer',
    location: 'Accra, Ghana',
    phone: '+233 24 987 6543',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80',
    bio: 'Restaurant owner looking for fresh, quality produce for my business.',
    rating: 4.5,
    joinedDate: '2021-02-10',
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const foundUser = mockUsers.find(u => u.email === email);
      if (!foundUser) {
        throw new Error('Invalid credentials');
      }
      
      setUser(foundUser);
      localStorage.setItem('user', JSON.stringify(foundUser));
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const register = async (
    name: string,
    email: string,
    password: string,
    role: UserRole
  ) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newUser: User = {
        id: `${mockUsers.length + 1}`,
        name,
        email,
        role,
        location: 'Ghana',
        phone: '',
        avatar: `https://images.unsplash.com/photo-${role === 'farmer' ? '1560787313-5dff3307e257' : '1494790108377-be9c29b29330'}?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80`,
        bio: '',
        rating: 0,
        joinedDate: new Date().toISOString().split('T')[0],
      };
      
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};