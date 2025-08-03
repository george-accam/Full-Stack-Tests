import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Leaf, CreditCard, Users, ArrowRight } from 'lucide-react';
import Button from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';
import { products } from '../data/mockData';
import ProductCard from '../components/marketplace/ProductCard';

const HomePage: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const featuredProducts = products.slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-green-900 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80"
            alt="Farm background"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Connecting Farmers and Buyers Directly
            </h1>
            <p className="text-xl text-green-100 mb-8">
              AgriMarket makes agricultural trade simple, transparent, and profitable. Buy fresh produce directly from farmers or sell your harvest to eager buyers.
            </p>
            <div className="flex flex-wrap gap-4">
              {isAuthenticated ? (
                <Link to="/marketplace">
                  <Button size="lg">
                    {user?.role === 'farmer' ? 'Sell Your Produce' : 'Browse Products'}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              ) : (
                <>
                  <Link to="/register">
                    <Button size="lg">
                      Get Started
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button variant="outline" size="lg" className="bg-white bg-opacity-10 text-white hover:bg-opacity-20">
                      Log In
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose AgriMarket?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform offers unique features designed to make agricultural trade easier and more profitable for everyone involved.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center p-3 bg-green-100 rounded-full mb-4">
                <ShoppingBag className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Direct Marketplace</h3>
              <p className="text-gray-600">
                Connect directly with farmers or buyers without intermediaries, ensuring better prices for everyone.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center p-3 bg-green-100 rounded-full mb-4">
                <Leaf className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Crop Diagnosis</h3>
              <p className="text-gray-600">
                Get instant analysis of crop health issues using our advanced AI technology to improve yields.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center p-3 bg-green-100 rounded-full mb-4">
                <CreditCard className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Payments</h3>
              <p className="text-gray-600">
                Multiple payment options with secure processing ensure safe and convenient transactions.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center p-3 bg-green-100 rounded-full mb-4">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Trust & Transparency</h3>
              <p className="text-gray-600">
                Ratings and reviews help build trust between farmers and buyers for long-term relationships.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
            <Link to="/marketplace" className="text-green-600 hover:text-green-800 font-medium flex items-center">
              View All
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-green-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Agricultural Business?</h2>
          <p className="text-xl text-green-100 mb-8 max-w-3xl mx-auto">
            Join thousands of farmers and buyers already using AgriMarket to grow their businesses and access fresh, quality produce.
          </p>
          <div className="flex justify-center space-x-4">
            <Link to="/register">
              <Button size="lg">
                Sign Up Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/marketplace">
              <Button variant="outline" size="lg" className="bg-white bg-opacity-10 text-white hover:bg-opacity-20">
                Explore Marketplace
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Users Say</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from farmers and buyers who have transformed their agricultural businesses with AgriMarket.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <img
                  src="https://cdn.ghanaweb.com/imagelib/pics/919/91997647.295.jpg"
                  alt="Daniel Osei"
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">Daniel Osei</h4>
                  <p className="text-gray-600 text-sm">Cassava Farmer, Cape Coast</p>
                </div>
              </div>
              <p className="text-gray-700">
                "Since joining AgriMarket, I've been able to sell my cassava directly to restaurants and processors. My income has increased by 40% because I no longer rely on middlemen."
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <img
                  src="https://i.pinimg.com/736x/d5/5e/6c/d55e6cb3c2f847c68a44a4f37a97b1e5.jpg"
                  alt="Accam George Buyer"
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">Accam George</h4>
                  <p className="text-gray-600 text-sm">Restaurant Owner, Accra</p>
                </div>
              </div>
              <p className="text-gray-700">
                "The quality of produce I get through AgriMarket is exceptional. I can source directly from farmers, ensuring freshness for my restaurant while supporting local agriculture."
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <img
                  src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80"
                  alt="Akosua Mensah"
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">Akosua Mensah</h4>
                  <p className="text-gray-600 text-sm">Plantain Farmer, Ho</p>
                </div>
              </div>
              <p className="text-gray-700">
                "The AI diagnosis tool helped me identify a disease in my plantain crop before it spread. I was able to treat it early and save my entire harvest. This platform is a game-changer!"
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;