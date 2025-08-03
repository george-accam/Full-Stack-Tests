import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Bell, ShoppingBag, User, Home, Leaf, CreditCard, Search } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';

const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navLinks = [
    { name: 'Home', path: '/', icon: <Home size={18} /> },
    { name: 'Marketplace', path: '/marketplace', icon: <ShoppingBag size={18} /> },
    ...(user?.role === 'farmer' ? [{ name: 'AI Diagnosis', path: '/diagnosis', icon: <Leaf size={18} /> }] : []),
    { name: 'Payments', path: '/payments', icon: <CreditCard size={18} /> },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <Leaf className="h-8 w-8 text-green-600" />
              <span className="ml-2 text-xl font-bold text-green-800">AgriMarket</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-md text-sm font-medium flex items-center transition-colors duration-200 ${
                  isActive(link.path)
                    ? 'bg-green-100 text-green-800'
                    : 'text-gray-700 hover:bg-green-50 hover:text-green-700'
                }`}
              >
                <span className="mr-1.5">{link.icon}</span>
                {link.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex md:items-center md:space-x-4">
            <button className="text-gray-500 hover:text-gray-700 focus:outline-none">
              <Search size={20} />
            </button>
            <button className="text-gray-500 hover:text-gray-700 focus:outline-none">
              <Bell size={20} />
            </button>

            {isAuthenticated ? (
              <div className="relative ml-3">
                <div>
                  <button
                    onClick={toggleProfile}
                    className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    <img
                      className="h-8 w-8 rounded-full object-cover border-2 border-green-200"
                      src={user?.avatar}
                      alt={user?.name}
                    />
                    <span className="ml-2 font-medium text-gray-700">{user?.name}</span>
                  </button>
                </div>
                {isProfileOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100">
                    <div className="py-1">
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        Your Profile
                      </Link>
                      <Link
                        to="/dashboard"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        Dashboard
                      </Link>
                    </div>
                    <div className="py-1">
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Sign out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex space-x-2">
                <Link to="/login">
                  <Button variant="outline" size="sm">
                    Log in
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="sm">Sign up</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            {isAuthenticated && (
              <>
                <button className="p-2 text-gray-500 hover:text-gray-700 focus:outline-none">
                  <Bell size={20} />
                </button>
                <Link to="/profile" className="p-2 text-gray-500 hover:text-gray-700 focus:outline-none">
                  <User size={20} />
                </Link>
              </>
            )}
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`block px-3 py-2 rounded-md text-base font-medium flex items-center ${
                isActive(link.path)
                  ? 'bg-green-100 text-green-800'
                  : 'text-gray-700 hover:bg-green-50 hover:text-green-700'
              }`}
              onClick={closeMenu}
            >
              <span className="mr-2">{link.icon}</span>
              {link.name}
            </Link>
          ))}
        </div>
        {!isAuthenticated && (
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="px-4 flex items-center justify-between">
              <Link to="/login" className="w-full mr-2">
                <Button variant="outline" fullWidth onClick={closeMenu}>
                  Log in
                </Button>
              </Link>
              <Link to="/register" className="w-full">
                <Button fullWidth onClick={closeMenu}>
                  Sign up
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;