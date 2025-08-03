import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-green-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <Leaf className="h-8 w-8 text-green-400" />
              <span className="ml-2 text-xl font-bold text-white">AgriMarket</span>
            </div>
            <p className="text-green-200 mb-4">
              Connecting farmers and buyers directly, making agricultural trade simple, transparent, and profitable.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-green-200 hover:text-white transition-colors duration-200">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-green-200 hover:text-white transition-colors duration-200">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-green-200 hover:text-white transition-colors duration-200">
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-green-100">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-green-200 hover:text-white transition-colors duration-200">Home</Link>
              </li>
              <li>
                <Link to="/marketplace" className="text-green-200 hover:text-white transition-colors duration-200">Marketplace</Link>
              </li>
              <li>
                <Link to="/diagnosis" className="text-green-200 hover:text-white transition-colors duration-200">AI Diagnosis</Link>
              </li>
              <li>
                <Link to="/payments" className="text-green-200 hover:text-white transition-colors duration-200">Payments</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-green-100">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-green-200 hover:text-white transition-colors duration-200">Farming Tips</a>
              </li>
              <li>
                <a href="#" className="text-green-200 hover:text-white transition-colors duration-200">Market Prices</a>
              </li>
              <li>
                <a href="#" className="text-green-200 hover:text-white transition-colors duration-200">Weather Forecast</a>
              </li>
              <li>
                <a href="#" className="text-green-200 hover:text-white transition-colors duration-200">FAQ</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-green-100">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <MapPin size={18} className="mr-2 text-green-400" />
                <span className="text-green-200">123 Farm Road, Accra, Ghana</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2 text-green-400" />
                <span className="text-green-200">+233 20 123 4567</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-2 text-green-400" />
                <span className="text-green-200">info@agrimarket.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-green-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-green-200 text-sm">
            &copy; {new Date().getFullYear()} AgriMarket. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-4 text-sm">
            <a href="#" className="text-green-200 hover:text-white transition-colors duration-200">Privacy Policy</a>
            <a href="#" className="text-green-200 hover:text-white transition-colors duration-200">Terms of Service</a>
            <a href="#" className="text-green-200 hover:text-white transition-colors duration-200">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;