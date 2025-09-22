import { useEffect, useState } from "react";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_BASE_URL;

import { useCart } from "../context/CartContext";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/api/products`);

        console.log("📦 Products API response:", data); // debug
        setProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("❌ Failed to fetch products:", err);
        setProducts([]);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-[#A7DBDB] py-12 text-center">
        <h1 className="text-3xl md:text-4xl font-serif text-black mb-4">
          Welcome to WINNY Studio’s
        </h1>
        <p className="text-lg text-gray-700">Shop the latest household items</p>
      </section>

      {/* Featured Products */}
      <section className="max-w-6xl mx-auto py-12 px-4">
        <h2 className="text-2xl font-bold mb-6">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white shadow rounded-lg p-4 hover:shadow-lg transition"
            >
              {product.image && (
                <img
                  src={`${
                    import.meta.env.VITE_API_BASE_URL || "http://localhost:5000"
                  }${product.image}`}
                  alt={product.name}
                  className="h-40 w-full object-cover rounded mb-3"
                  crossOrigin="anonymous"
                  onError={(e) => {
                    e.target.src = "/fallback.png";
                  }} // optional fallback
                />
              )}
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-gray-600">${product.price}</p>
              <button
                onClick={() => addToCart(product)}
                className="mt-3 w-full bg-[#ff3f8e] text-white py-2 rounded hover:bg-[#e5367b]"
              >
                Add to Cart
              </button>
            </div>
          ))}
          {products.length === 0 && (
            <p className="col-span-full text-center text-gray-500">
              No products available yet.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
