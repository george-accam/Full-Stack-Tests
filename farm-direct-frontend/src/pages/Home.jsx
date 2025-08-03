import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-green-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Welcome to AgriMarket
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Connecting farmers directly with customers for fresh, local produce
          </p>
          <div className="flex justify-center gap-4">
            <Link
              to="/register?role=farmer"
              className="bg-white text-green-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition"
            >
              I'm a Farmer
            </Link>
            <Link
              to="/register?role=customer"
              className="border-2 border-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-green-600 transition"
            >
              I'm a Customer
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-green-600">
          Why Choose AgriMarket?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Fresh Produce",
              description:
                "Get farm-fresh products directly from local farmers",
              icon: "🍎",
            },
            {
              title: "Support Local",
              description: "Help sustain your local farming community",
              icon: "🌱",
            },
            {
              title: "Easy Ordering",
              description: "Simple and convenient shopping experience",
              icon: "🛒",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md text-center"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-6">Ready to get started?</h2>
          <Link
            to="/products"
            className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition"
          >
            Browse Products
          </Link>
        </div>
      </section>
    </div>
  );
}
