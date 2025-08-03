import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-agri-light flex flex-col items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-agri-green mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-6">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-block bg-agri-green text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
        >
          Go to Homepage
        </Link>
      </div>
    </div>
  );
}
